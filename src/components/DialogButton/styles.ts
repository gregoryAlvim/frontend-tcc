import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface NewTransactionButtonProps {
  variant?: 'income' | 'expense'
}

export const NewTransactionButton = styled.button<NewTransactionButtonProps>`
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
