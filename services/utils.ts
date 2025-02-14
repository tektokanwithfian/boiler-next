import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAge(bd: Date): number {
  const today = new Date()
  let a = today.getFullYear() - bd.getFullYear()
  const monthDiff = today.getMonth() - bd.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bd.getDate())) {
    a -= 1
  }

  return a
}

export const lifeStages = [
  'Infancy (0-12 months)',
  'Toddlerhood (1-3 years)',
  'Childhood (4-8 years)',
  'Preadolescence (9-13 years)',
  'Adolescence (14-18 years)',
  'Adulthood (19-50 years)',
  'Pregnancy',
  'Lactation',
  'Older Adulthood (50+ years)',
] as const

export function getLifeStage(dob: Date): typeof lifeStages[number] {
  const age = getAge(dob)

  if (age < 1) return 'Infancy (0-12 months)'
  if (age >= 1 && age <= 3) return 'Toddlerhood (1-3 years)'
  if (age >= 4 && age <= 8) return 'Childhood (4-8 years)'
  if (age >= 9 && age <= 13) return 'Preadolescence (9-13 years)'
  if (age >= 14 && age <= 18) return 'Adolescence (14-18 years)'
  if (age >= 19 && age <= 50) return 'Adulthood (19-50 years)'
  return 'Older Adulthood (50+ years)'
}

export function getAgeUnix(bd: number): number {
  const subtracted = ((new Date()).getTime() - Number(bd))

  return Math.floor(subtracted / (1000 * 60 * 60 * 24 * 365))
}

export function randomiser(n:number = 16) {
  return customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', n)()
}

export function getExtension(filename:string) {
  return filename.split('.').pop()
}

export function generateFilename(name:string) {
  const ext = getExtension(name)

  return `${randomiser(16)}.${ext}`
}
