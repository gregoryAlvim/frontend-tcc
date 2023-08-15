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
  id: string
  date: string
  value: number
  isPay: boolean
  createdAt: string
  category: Category
  description: string
}

export interface Income {
  id: string
  date: string
  value: number
  createdAt: string
  category: Category
  description: string
  isReceived: boolean
}
