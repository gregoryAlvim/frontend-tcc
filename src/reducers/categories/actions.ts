import { Category } from '../../@types/mockes'

export enum ActionTypesToCategories {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY',
}

export function fetchCategoriesAction(categories: Category[]) {
  return {
    type: ActionTypesToCategories.FETCH_CATEGORIES,
    payload: {
      categories,
    },
  }
}

export function addNewIncomeAction(newCategory: Category) {
  return {
    type: ActionTypesToCategories.ADD_NEW_CATEGORY,
    payload: {
      newCategory,
    },
  }
}
