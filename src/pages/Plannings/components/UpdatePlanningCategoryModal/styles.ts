import styled from 'styled-components'

export const CardToGoal = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;

  button {
    width: 8rem;
    height: 3rem;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    font-size: 1.4rem;
    padding: 0 1rem;
    border-radius: 6px;

    &:hover {
      background: ${(props) => props.theme['green-700']};
    }
  }

  .cancelButton {
    background: none;
    color: ${(props) => props.theme['purple-500']};
    border: 1px solid ${(props) => props.theme['purple-500']};

    &:hover {
      background: none;
      color: ${(props) => props.theme['red-500']};
      border: 1px solid ${(props) => props.theme['red-500']};
    }
  }
`
