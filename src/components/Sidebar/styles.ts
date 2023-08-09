import { styled } from 'styled-components'

const animationDuration = 300

interface SidebarContainerProps {
  variant?: string
}

export const SidebarContainer = styled.header<SidebarContainerProps>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 2rem 1rem;

  background: ${(props) => props.theme['gray-900']};
  transition: width ${animationDuration}ms ease-in-out;
  width: ${(props) => (props.variant === 'true' ? '20rem' : '6rem')};
`

export const DropdownMenuButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  background: transparent;

  svg {
    color: ${(props) => props.theme['gray-300']};
  }
`

export const NavBarContainer = styled.nav<SidebarContainerProps>`
  min-width: 4rem;
  max-width: 1000px;
  margin-top: 5rem;

  gap: 2rem;
  display: flex;
  flex-direction: column;

  button {
    border: none;
    background: transparent;
    color: ${(props) => props.theme['gray-300']};
    position: absolute;
    bottom: 0;
    margin-bottom: 2rem;
  }
`
