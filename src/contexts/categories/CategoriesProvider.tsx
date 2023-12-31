import { toast } from 'react-toastify'
import { apiPrivate } from '../../lib/axios'
import { CategoriesContext } from './CategoriesContext'
import { categoriesReducer } from '../../reducers/categories/reducer'
import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { fetchCategoriesAction } from '../../reducers/categories/actions'
import { Category } from '../../@types/mockes'
import { ToastMessages } from '../../utils/ToastMessages'

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

      dispatch(fetchCategoriesAction(response.data))
    } catch (error: any) {
      if (error.response.status) {
        showToastError(error.response.data.message)
      } else {
        showToastError('Algo deu errado, tente novamente!')
      }
    }
  }, [])

  async function createNewCategory(data: Category) {
    const { name, type } = data

    const response = await apiPrivate.post('categories/create-category', {
      name,
      type,
    })

    ToastMessages.showToastSuccess(response.data.message)

    fetchCategories()
  }

  async function updateCategory(categoryUUID: string, name: string) {
    const response = await apiPrivate.patch(
      `categories/update-category-by/${categoryUUID}`,
      {
        name,
      },
    )

    ToastMessages.showToastSuccess(response.data.message)

    fetchCategories()
  }

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        updateCategory,
        createNewCategory,
        categoriesToIncome,
        categoriesToExpense,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
