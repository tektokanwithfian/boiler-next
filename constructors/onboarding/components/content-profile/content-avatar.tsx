import { ImageIcon, Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { schema } from './actions/schema'
import type { ChangeEvent } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string>('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('avatar', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <FormField
      control={form.control}
      name="avatar"
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <div className="flex justify-between items-center">
              <div
                className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => fileRef.current?.click()}
                onKeyDown={() => fileRef.current?.click()}
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm">Upload photo</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start justify-center">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileRef}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                <FormDescription>
                  Upload a profile picture (optional).
                </FormDescription>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Component
