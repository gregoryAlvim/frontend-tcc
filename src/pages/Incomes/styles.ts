import { styled } from 'styled-components'

export const IncomesContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 8rem auto 0;
  padding: 0 1.5rem;
`

export const IncomesHeader = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;

  margin-bottom: 2rem;
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
