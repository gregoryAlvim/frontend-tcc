import { styled } from 'styled-components'

export const SignInContainer = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`

export const SignInContent = styled.article`
  width: 80rem;
  height: 40rem;
  background: ${(props) => props.theme['gray-700']};
`

export const SignInForm = styled.form`
  width: 40rem;
  height: 40rem;
  padding: 5rem;
  background: ${(props) => props.theme['gray-900']};

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SignInLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    color: ${(props) => props.theme['white-300']};
  }
`

export const SignInInput = styled.input`
  width: 30rem;
  height: 5rem;

  flex: 1;
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme['gray-1  00']};
  color: ${(props) => props.theme['gray-900']};
  padding: 1rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const SignInButton = styled.button`
  width: 30rem;
  height: 5rem;
  border: none;
  border-radius: 6px;
  margin-top: 5rem;
  color: ${(props) => props.theme['white-300']};
  background: ${(props) => props.theme['green-500']};

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
    transition:
      background-color 0.22s,
      color 0.2s,
      border-color 0.2s;
  }
`
