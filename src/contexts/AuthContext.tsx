import { api } from '../lib/axios'
import secureLocalStorage from 'react-secure-storage'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CustomError } from '../utils/CustomError'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: Date
  updatedAt: Date
  password: string
}

interface AuthContextType {
  user: User | null
  signOut: () => void
  refreshAccessToken: () => void
  signIn: (username: string, password: string) => void
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User | null>(null)

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

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      setData({ ...user })
    } catch (error) {
      if (error instanceof CustomError) {
        alert(error.message)
      } else {
        alert('Não foi possível acessar sua conta, tente novamente mais tarde!')
      }
    }
  }

  function signOut() {
    secureLocalStorage.removeItem('@smartExpense:user')
    secureLocalStorage.removeItem('@smartExpense:accessToken')
    secureLocalStorage.removeItem('@smartExpense:refreshToken')

    setData(null)
  }

  async function refreshAccessToken() {
    const refreshToken = secureLocalStorage.getItem(
      '@smartExpense:refreshToken',
    )

    const response = await api.post('/auth/refresh', { refreshToken })

    const { accessToken } = response.data

    secureLocalStorage.removeItem('@smartExpense:accessToken')
    secureLocalStorage.setItem('@smartExpense:accessToken', accessToken)
  }

  useEffect(() => {
    const user = secureLocalStorage.getItem('@smartExpense:user')
    const accessToken = secureLocalStorage.getItem('@smartExpense:accessToken')
    const refreshToken = secureLocalStorage.getItem(
      '@smartExpense:refreshToken',
    )

    if (accessToken && refreshToken && user) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      const parsedUser = JSON.parse(`${user}`)

      setData({ ...parsedUser })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, refreshAccessToken, user: data }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
