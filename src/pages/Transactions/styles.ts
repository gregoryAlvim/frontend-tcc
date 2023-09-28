import { styled } from 'styled-components'

export const TransactionsContainer = styled.main`
  margin: 8rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsHeader = styled.header`
  max-width: 33rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

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

export const GraphicsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 8rem;
  }
`

export const GraphicsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 40rem;
  height: 40rem;

  align-items: center;
`
