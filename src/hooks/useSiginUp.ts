import { api } from '../lib/axios'
import { CustomError } from '../utils/CustomError'

export function useSignUp() {
  async function signUp(name: string, email: string, password: string) {
    try {
      await api.post('/users/create-user', {
        name,
        email,
        password,
      })
    } catch (error) {
      if (error instanceof CustomError) {
        alert(error.message)
      } else {
        alert(
          'Não foi possível cadastrar sua conta, tente novamente mais tarde!',
        )
      }
    }
  }

  return {
    signUp,
  }
}
