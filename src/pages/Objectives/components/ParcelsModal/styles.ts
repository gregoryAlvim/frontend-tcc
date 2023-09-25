import { styled } from 'styled-components'

export const ParcelsContainer = styled.div`
  height: 50rem;
  overflow-y: auto;
  padding: 1rem;

  table {
    margin-top: 2rem;
    border-spacing: 0 0.5rem;
    border-collapse: separate;

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
  }
`

export const ParcelCard = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  width: 20rem;
  background: ${(props) => props.theme['gray-900']};
`
