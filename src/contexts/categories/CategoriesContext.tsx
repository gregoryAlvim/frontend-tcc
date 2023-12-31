import { Category } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface CategoriesContextType {
  categories: Category[]
  categoriesToIncome: Category[]
  categoriesToExpense: Category[]
  createNewCategory: (data: Category) => void
  updateCategory: (categoryUUID: string, name: string) => void
}

export const CategoriesContext = createContext({} as CategoriesContextType)
