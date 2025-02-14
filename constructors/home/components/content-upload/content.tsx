'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useForm } from 'react-hook-form'
import Mark from '@/components/app/logo/mark'
import Spinner from '@/components/app/spinner'
import { useToast } from '@/services/hooks/use-toast'
import { generateFilename, getExtension } from '@/services/utils'
import { create } from './actions/actions'
import { schema } from './actions/schema'
import type { z } from 'zod'

function Component() {
  const { toast } = useToast()
  const router = useRouter()

  const [uploading, setUploading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: {
        key: '',
        name: '',
        type: '',
      },
    },
  })

  const { executeAsync } = useAction(create, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Your diary has been successfully created.',
      })

      router.push('/')
      window.location.replace('/')
    },
    onExecute: () => {
      toast({
        title: 'Executing...',
        description: 'Please wait, while your diary is being created.',
      })
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast({
          title: 'Something went wrong',
          description: error.serverError as string,
          variant: 'destructive',
        })
      }
      if (error.validationErrors) {
        toast({
          title: 'Something went wrong',
          description: JSON.stringify(error.validationErrors),
          variant: 'destructive',
        })
      }
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    onDrop: async (files) => {
      setUploading(true)
      const file = files && files[0]
      if (!file) {
        return
      }
      const { type, name } = file
      const filename = generateFilename(name)
      const key = `${getExtension(name)}/${filename}`

      const response = await fetch('/api/signedurl', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, type }),
      })
      const { url } = await response.json()

      const upload = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': type },
        body: file,
      })
      if (!upload.ok) {
        throw new Error('Upload failed')
      }

      form.setValue('file', { key, name: filename, type })
      await executeAsync(form.getValues())

      setUploading(false)
    },
    onError: (e) => {
      setUploading(false)
      toast({
        description: e.message,
        title: 'Upload failed',
        variant: 'destructive',
      })
    },
  })

  return (
    <div className="fixed bottom-16 md:bottom-5 z-20 mx-auto inset-x-0">
      <div className="mx-auto h-28 w-28 p-8 flex flex-col items-center justify-center rounded-full bg-primary group cursor-pointer shadow-lg overflow-hidden">
        <div className="w-[104px] h-[104px] shrink-0 flex flex-col items-center justify-center rounded-full bg-primary border-dashed border-[3px] border-white group-hover:border-gray-200" {...getRootProps()}>
          <input {...getInputProps()} />
          {!uploading && (
            <Mark className="size-[4.5rem] shrink-0 fill-white group-hover:fill-gray-200" />
          )}
          {uploading && (
            <Spinner className="size-12 shrink-0 mr-0 border-white border-t-primary" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Component
