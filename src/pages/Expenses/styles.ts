import { styled } from 'styled-components'

export const ExpensesContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 8rem auto 0;
  padding: 0 1.5rem;
`
export const ExpensesHeader = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;

  margin-bottom: 2rem;
`
export const NewExpenseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem 1.5rem;
  border-radius: 6px;

  background: transparent;
  color: ${(props) => props.theme['red-300']};
  border: 1px solid ${(props) => props.theme['red-300']};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['red-300']};
    color: ${(props) => props.theme.white};
    transition: all 0.3s;
  }
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  tbody {
    td {
      font-size: 1.4rem;
    }
  }
`

interface PriceHighLightProps {
  variant: 'income' | 'expense'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
