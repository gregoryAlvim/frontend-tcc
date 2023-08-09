import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/AuthContext'

const SignInSchema = z.object({
  username: z.string({
    required_error: 'Name is required',
  }),
  password: z.string(),
})

type SignInInputs = z.infer<typeof SignInSchema>

export function SignIn() {
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(SignInSchema),
  })

  async function handleLoginData(data: SignInInputs) {
    const { username, password } = data

    await signIn(username, password)
  }

  return (
    <S.SignInContainer>
      <S.SignInContent>
        <S.SignInForm onSubmit={handleSubmit(handleLoginData)}>
          <S.SignInLabel>
            <span>Nome de usuário</span>
            <S.SignInInput type="text" required {...register('username')} />
          </S.SignInLabel>
          <S.SignInLabel>
            <span>Senha</span>
            <S.SignInInput type="password" required {...register('password')} />
          </S.SignInLabel>
          <S.SignInButton disabled={isSubmitting}>Entrar</S.SignInButton>
        </S.SignInForm>
      </S.SignInContent>
    </S.SignInContainer>
  )
}
