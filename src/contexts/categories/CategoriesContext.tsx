import { Category } from '../../@types/mockes'
import { createContext } from 'use-context-selector'

interface CategoriesContextType {
  categories: Category[]
  categoriesToIncome: Category[]
  categoriesToExpense: Category[]
}

export const CategoriesContext = createContext({} as CategoriesContextType)
