import styled from 'styled-components'

export const ContentContainer = styled.div`
  margin-top: 2rem;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  .DeleteButton {
    background: ${(props) => props.theme['red-500']};

    &:hover {
      background: ${(props) => props.theme['red-700']};
    }
  }

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
`
