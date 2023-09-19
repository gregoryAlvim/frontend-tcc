import styled from 'styled-components'

export const CategoriesContainer = styled.article`
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;

    thead {
      td {
        background: ${(props) => props.theme['gray-600']};
      }
    }

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

export const CategoriesHeader = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;

  margin-bottom: 2rem;
`

export const SwitchTypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .SwitchRoot {
    width: 50px;
    height: 25px;
    cursor: pointer;
    position: relative;
    border-radius: 9999px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: ${(props) => props.theme['gray-900']};
  }

  .SwitchThumb {
    width: 21px;
    height: 21px;
    display: block;
    border-radius: 9999px;
    will-change: transform;
    transform: translateX(2px);
    transition: transform 100ms;
    background: ${(props) => props.theme['red-300']};
  }

  .SwitchThumb[data-state='checked'] {
    transform: translateX(25px);
    color: ${(props) => props.theme['gray-100']};
    background: ${(props) => props.theme['green-300']};
  }

  .SelectedType {
    color: ${(props) => props.theme['gray-100']};
  }
`

export const SwitchType = styled.span`
  font-size: 1.8rem;
  color: ${(props) => props.theme['gray-600']};
`
