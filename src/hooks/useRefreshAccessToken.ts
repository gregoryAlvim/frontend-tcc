import { api, apiPrivate } from '../lib/axios'
import secureLocalStorage from 'react-secure-storage'

export async function useRefreshAccessToken() {
  const refreshToken = secureLocalStorage.getItem('@smartExpense:refreshToken')

  const response = await api.post('/auth/refresh', { refresh: refreshToken })

  const { accessToken } = response.data

  secureLocalStorage.removeItem('@smartExpense:accessToken')
  secureLocalStorage.setItem('@smartExpense:accessToken', accessToken)

  return accessToken
}
