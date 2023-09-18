import { styled } from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const FormContainer = styled.form`
  button[type='submit'] {
    height: 5rem;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'expense'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  &[data-state='unchecked']:hover {
    background: ${(props) => props.theme['gray-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .SwitchRoot {
    width: 42px;
    height: 25px;
    cursor: pointer;
    position: relative;
    border-radius: 9999px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: ${(props) => props.theme['gray-900']};
  }

  .SwitchRoot[data-state='checked'] {
  }

  .SwitchThumb {
    width: 21px;
    height: 21px;
    display: block;
    border-radius: 9999px;
    will-change: transform;
    transform: translateX(2px);
    transition: transform 100ms;
    background-color: ${(props) => props.theme['gray-300']};
  }
  .SwitchThumb[data-state='checked'] {
    transform: translateX(19px);
    color: ${(props) => props.theme['gray-100']};
    background: ${(props) => props.theme['green-300']};
  }
`
