import * as z from 'zod'
import * as S from './styles'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/auth/AuthProvider'

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

    signIn(username, password)
  }

  return (
    <S.SignInContainer>
      <S.SignInContent>
        <S.SignInForm onSubmit={handleSubmit(handleLoginData)}>
          <S.SignInFormTitle>Login</S.SignInFormTitle>
          <S.SignInLabel>
            <span>E-mail</span>
            <S.SignInInput type="text" required {...register('username')} />
          </S.SignInLabel>
          <S.SignInLabel>
            <span>Senha</span>
            <S.SignInInput type="password" required {...register('password')} />
          </S.SignInLabel>
          <S.SignInButton disabled={isSubmitting}>Entrar</S.SignInButton>
        </S.SignInForm>

        <S.SignUpContainer>
          <S.SignUpTitle>Você ainda não tem uma conta?</S.SignUpTitle>
          <Link to="/cadastro">
            <S.SignUpButton>Inscrever-se</S.SignUpButton>
          </Link>
        </S.SignUpContainer>
      </S.SignInContent>
    </S.SignInContainer>
  )
}
