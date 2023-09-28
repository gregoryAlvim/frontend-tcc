import { styled } from 'styled-components'

export const TransactionsMenu = styled.nav`
  padding: 1rem;
  height: 100%;
  max-width: 1120px;
  border-radius: 6px;
  margin-bottom: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  background: ${(props) => props.theme['gray-600']};

  .SeparatorRoot {
    background-color: ${(props) => props.theme['gray-400']};
  }

  .SeparatorRoot[data-orientation='horizontal'] {
    height: 2px;
    width: 100%;
  }
  .SeparatorRoot[data-orientation='vertical'] {
    width: 1px;
    height: 18px;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;

    .SeparatorRoot[data-orientation='vertical'] {
      height: 2px;
      width: 50%;
    }
  }
`

interface TransactionsNavItemProps {
  readonly variant: string
}

export const TransactionsNavItem = styled.li<TransactionsNavItemProps>`
  list-style-type: none;
  cursor: pointer;

  font-size: 1.7rem;

  color: ${(props) =>
    props.variant === 'true' ? props.theme['purple-300'] : props.theme.white};

  &:hover {
    color: ${(props) => props.theme['purple-500']};
    transition: color 0.3s;
  }
`
