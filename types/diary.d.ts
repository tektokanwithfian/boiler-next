export interface Diary {
  id?: string
  category?: string
  description?: string
  file?: {
    key?: string
    name?: string
    type?: string
    url?: string
  }
  health?: {
    improvements?: string
    negatives?: string
    positives?: string
    reasoning?: string
    rating?: number
  }
  name?: string
  nutrients?: {
    calories?: number
    carbohydrates?: number
    cholesterol?: number
    fat?: number
    fiber?: number
    protein?: number
    saturatedFat?: number
    sodium?: number
    sugar?: number
    others: [{
      name?: string
      value?: number
      metric?: string
      description?: string
    }]
  }
  recipe?: {
    ingredients?: string[]
    steps?: string[]
  }
  user?: string
  createdAt?: number
  updatedAt?: number
}
