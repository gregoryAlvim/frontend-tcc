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

export const NewIncomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem 1.5rem;
  border-radius: 6px;

  background: transparent;
  color: ${(props) => props.theme['green-300']};
  border: 1px solid ${(props) => props.theme['green-300']};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme.white};
    transition: all 0.3s;
  }
`
