import { Category } from '../../@types/mockes'
import { ActionTypesToCategories } from './actions'

interface CategoriesState {
  categories: Category[]
}

export function categoriesReducer(state: CategoriesState, action: any) {
  switch (action.type) {
    case ActionTypesToCategories.FETCH_CATEGORIES:
      return {
        ...state,
        categories: [action.payload.categories],
      }
    case ActionTypesToCategories.ADD_NEW_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload.newCategory],
      }
    default:
      return state
  }
}
