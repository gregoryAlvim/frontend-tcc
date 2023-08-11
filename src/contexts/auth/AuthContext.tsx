import { createContext } from 'react'
import { User } from '../../@types/User'
import 'react-toastify/dist/ReactToastify.css'

interface AuthContextType {
  user: User | null
  signOut: () => void
  signIn: (username: string, password: string) => void
}

export const AuthContext = createContext({} as AuthContextType)
