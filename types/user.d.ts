export interface User {
  id?: string
  application?: string
  device?: Device | null
  email?: string
  name?: string
  profilePic?: string
  provider?: string
  createdAt?: number
  updatedAt?: number
}

export interface Device {
  token?: string
}

export interface Profile {
  id?: string
  active?: boolean
  dob?: number
  extended?: ProfileExtended
  goal?: ProfileGoal
  height?: number
  name?: string
  sex?: 'male' | 'female' | 'other' | string
  lifeStage?: string
  weight?: number
  user?: string
  createdAt?: number
  updatedAt?: number
}
export interface ProfileExtended {
  allergies?: string
  familyHealthHistory?: string
  healthCondition?: string
  medications?: string
  physicalActivityLevel?: string
}

export interface ProfileGoal {
  code?: string
  label?: string
  description?: string
}
