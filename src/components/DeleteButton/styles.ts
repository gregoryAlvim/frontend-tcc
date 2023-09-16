import styled from 'styled-components'

export const deleteItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme['red-300']};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme['red-700']};
    transition: all 0.3s;
  }
`
