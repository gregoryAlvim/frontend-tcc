import { styled } from 'styled-components'

interface NewTransactionButtonProps {
  variant?: 'income' | 'expense'
}

export const NewTransactionButton = styled.button<NewTransactionButtonProps>`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme['purple-300']};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme['gray-100']};
    transition: all 0.3s;
  }
`
