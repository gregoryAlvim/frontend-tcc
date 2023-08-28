import { toast } from 'react-toastify'
import { apiPrivate } from '../../lib/axios'
import { CategoriesContext } from './CategoriesContext'
import { categoriesReducer } from '../../reducers/categories/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { fetchCategoriesAction } from '../../reducers/categories/actions'

interface CategoriesProviderProps {
  children: ReactNode
}

function showToastError(message: string) {
  toast.error(message)
}

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categoriesState, dispatch] = useReducer(categoriesReducer, {
    categories: [],
    categoriesToIncome: [],
    categoriesToExpense: [],
  })

  const { categories, categoriesToIncome, categoriesToExpense } =
    categoriesState

  const fetchCategories = useCallback(async () => {
    try {
      const response = await apiPrivate.get('categories/get-all')
      console.log(response.data.allCategoriesHTTP.length)
      dispatch(fetchCategoriesAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        showToastError(error.response.data.message)
      } else {
        showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <CategoriesContext.Provider
      value={{ categories, categoriesToIncome, categoriesToExpense }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
