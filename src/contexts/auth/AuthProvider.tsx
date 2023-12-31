import { toast } from 'react-toastify'
import { User } from '../../@types/mockes'
import { AuthContext } from './AuthContext'
import { api, apiPrivate } from '../../lib/axios'
import secureLocalStorage from 'react-secure-storage'
import { ReactNode, useState, useEffect, useContext } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  function showToastError(message: string) {
    toast.error(message)
  }

  interface signInResponse {
    user: User
    accessToken: string
    refreshToken: string
  }

  async function signIn(username: string, password: string) {
    try {
      const { data } = await api.post<signInResponse>('/auth/login', {
        username,
        password,
      })

      const { user, accessToken, refreshToken } = data

      secureLocalStorage.setItem('@smartExpense:user', JSON.stringify(user))
      secureLocalStorage.setItem('@smartExpense:accessToken', accessToken)
      secureLocalStorage.setItem('@smartExpense:refreshToken', refreshToken)

      apiPrivate.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      setUser({ ...user })
    } catch (error: any) {
      if (error.response.status) {
        showToastError(error.response.data.message)
      } else {
        showToastError(
          'Não foi possível acessar sua conta, tente novamente mais tarde!',
        )
      }
    }
  }

  function signOut() {
    secureLocalStorage.removeItem('@smartExpense:user')
    secureLocalStorage.removeItem('@smartExpense:accessToken')
    secureLocalStorage.removeItem('@smartExpense:refreshToken')

    setUser(null)
  }

  useEffect(() => {
    const user = secureLocalStorage.getItem('@smartExpense:user')
    const accessToken = secureLocalStorage.getItem('@smartExpense:accessToken')
    const refreshToken = secureLocalStorage.getItem(
      '@smartExpense:refreshToken',
    )

    if (accessToken && refreshToken && user) {
      apiPrivate.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      const parsedUser = JSON.parse(`${user}`)

      setUser({ ...parsedUser })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
