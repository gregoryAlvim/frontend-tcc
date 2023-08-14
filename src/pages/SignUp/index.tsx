import * as z from 'zod'
import * as S from './styles'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSignUp } from '../../hooks/useSiginUp'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

type SignUpInputs = z.infer<typeof SignUpSchema>

export function SignUp() {
  const { signUp } = useSignUp()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
  })

  async function handleCreateUserAccount(data: SignUpInputs) {
    const { name, email, password } = data

    await signUp(name, email, password)
  }

  return (
    <S.SignUpContainer>
      <S.SignUpContent>
        <S.SignUpForm onSubmit={handleSubmit(handleCreateUserAccount)}>
          <S.SignUpFormTitle>Cadastro</S.SignUpFormTitle>
          <S.SignUpLabel>
            <span>Nome</span>
            <S.SignUpInput type="text" required {...register('name')} />
          </S.SignUpLabel>
          <S.SignUpLabel>
            <span>E-mail</span>
            <S.SignUpInput type="text" required {...register('email')} />
          </S.SignUpLabel>
          <S.SignUpLabel>
            <span>Senha</span>
            <S.SignUpInput type="password" required {...register('password')} />
          </S.SignUpLabel>
          <S.SignUpButton disabled={isSubmitting}>Cadastrar</S.SignUpButton>
        </S.SignUpForm>

        <S.SignInContainer>
          <S.SignInTitle>Você já tem uma conta?</S.SignInTitle>
          <Link to="/">
            <S.SignInButton>Fazer login</S.SignInButton>
          </Link>
        </S.SignInContainer>
      </S.SignUpContent>
    </S.SignUpContainer>
  )
}
