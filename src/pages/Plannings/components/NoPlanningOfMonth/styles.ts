import styled from 'styled-components'

export const NoPlanningOfMonth = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: ${(props) => props.theme['gray-700']};
`
