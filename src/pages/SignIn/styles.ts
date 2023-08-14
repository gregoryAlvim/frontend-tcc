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

  display: flex;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
`

export const SignInForm = styled.form`
  width: 40rem;
  height: 40rem;
  padding: 3rem 5rem;
  background: ${(props) => props.theme['gray-900']};
  border-bottom-left-radius: 20px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SignInFormTitle = styled.h1`
  color: ${(props) => props.theme['white-300']};
  font-size: 3rem;
  font-weight: bold;
`

export const SignInLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    font-size: 1.4rem;
    color: ${(props) => props.theme['gray-300']};
  }
`

export const SignInInput = styled.input`
  width: 30rem;
  height: 5rem;

  flex: 1;
  border-radius: 6px;
  border: 0;
  background: transparent;
  border: 1px solid ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-100']};
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
  margin-top: 3rem;
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

export const SignUpContainer = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  a {
    margin-top: 3rem;
  }
`

export const SignUpTitle = styled.span`
  font-weight: bold;
  font-size: 3rem;
  text-align: start;
  width: 30rem;
`

export const SignUpButton = styled.button`
  width: 30rem;
  height: 5rem;
  border: none;
  border-radius: 6px;

  color: ${(props) => props.theme['white-300']};
  background: ${(props) => props.theme['green-700']};

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
    transition:
      background-color 0.22s,
      color 0.2s,
      border-color 0.2s;
  }
`
