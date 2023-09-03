import { styled } from 'styled-components'

export const SuggestionsContainer = styled.article`
  margin-top: 2rem;

  span {
    font-size: 1.3rem;
  }
`

export const SuggestionsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
`

export const SuggestionCard = styled.div`
  cursor: pointer;
  padding: 2rem;
  width: 20rem;
  height: 20rem;
  background: ${(props) => props.theme['gray-900']};
  border-radius: 6px;
  text-align: center;

  p {
    margin: 2rem 0;
  }
`

export const ButtonSelectCard = styled.button`
  height: 4rem;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 3rem;

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`
