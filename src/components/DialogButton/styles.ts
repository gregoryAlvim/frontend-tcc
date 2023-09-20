import { all } from 'axios'
import { styled } from 'styled-components'

interface NewTransactionButtonProps {
  variant?: 'income' | 'expense'
}

export const NewItemButton = styled.button<NewTransactionButtonProps>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem 1.5rem;
  border-radius: 6px;

  background: transparent;
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
  border: 1px solid
    ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
    color: ${(props) => props.theme.white};
    transition: all 0.3s;
  }
`

export const OpenModalButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => props.theme['purple-300']};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme['purple-500']};
    transition: all 0.3s;
  }
`
