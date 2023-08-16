import { createContext } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import { User } from '../../@types/mockes'

interface AuthContextType {
  user: User | null
  signOut: () => void
  signIn: (username: string, password: string) => void
}

export const AuthContext = createContext({} as AuthContextType)
