import { z } from 'zod'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: Date
  updatedAt: Date
  password: string
}

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  createdAt: string
}

export interface Expense {
  id?: string
  date: string
  value: number
  isPay: boolean
  createdAt?: string
  category: Category
  description: string
}

export interface Income {
  id?: string
  date: string
  value: number
  createdAt?: string
  category: Category
  description: string
  isReceived: boolean
}

export interface Parcel {
  id?: string
  value: number
  month: MonthEnum
  portion: number
  createdAt?: Date
  isPaid?: boolean
}

export interface Objective {
  id?: string
  date: string
  goal: number
  parcels: Parcel[]
  createdAt?: string
  description: string
  initialValue: number
  isActivated?: boolean
}

export type ObjectivePreview = Pick<
  Objective,
  'date' | 'description' | 'initialValue' | 'goal'
>

export interface Suggestion {
  id?: string
  name: string
  amountParcels: number
  valueOfParcels: number
}

export interface PlanningByCategory {
  id?: string
  goal: number
  category: Category
  createdAt?: string
}

export interface Planning {
  id?: string
  goal: number
  month: string
  planningsByCategory: PlanningByCategory[]
  createdAt?: string
}
