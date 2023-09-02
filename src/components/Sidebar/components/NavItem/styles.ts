import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

export const NavItemContainer = styled.ul`
  @keyframes nav-title-appear {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes nav-title-disappear {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-10px);
    }
  }

  .nav-title-appear {
    animation: nav-title-appear 1.5s forwards;
  }

  .nav-title-disappear {
    animation: nav-title-disappear 1.5s forwards;
  }

  .selected {
    color: ${(props) => props.theme['purple-500']};
  }

  &:last-child {
    position: absolute;
    left: 15px;
    bottom: 20px;
  }
`
interface NavLinkProps {
  variant?: string
}

export const NavLink = styled(Link)<NavLinkProps>`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  color: ${(props) => props.theme.white};

  &:hover {
    color: ${(props) => props.theme['purple-500']};
    transition: color 0.3s;
  }
`

export const NavTitle = styled.span`
  position: absolute;
  left: 4rem;
  margin-left: 2rem;
  text-align: justify;
`
