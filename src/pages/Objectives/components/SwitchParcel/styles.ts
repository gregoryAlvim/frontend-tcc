import { styled } from 'styled-components'

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .SwitchRoot {
    width: 42px;
    height: 25px;
    cursor: pointer;
    position: relative;
    border-radius: 9999px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: ${(props) => props.theme['gray-900']};
  }

  .SwitchRoot[data-state='checked'] {
  }

  .SwitchThumb {
    width: 21px;
    height: 21px;
    display: block;
    border-radius: 9999px;
    will-change: transform;
    transform: translateX(2px);
    transition: transform 100ms;
    background-color: ${(props) => props.theme['gray-300']};
  }
  .SwitchThumb[data-state='checked'] {
    transform: translateX(19px);
    color: ${(props) => props.theme['gray-100']};
    background: ${(props) => props.theme['green-300']};
  }
`
