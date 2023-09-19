import styled from 'styled-components'

export const SliderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30rem;
  height: 22rem;

  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  h3 {
    font-size: 2rem;
  }

  .SeparatorRoot {
    background-color: ${(props) => props.theme['gray-400']};
  }

  .SeparatorRoot[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }
  .SeparatorRoot[data-orientation='vertical'] {
    width: 1px;
    height: 100%;
  }

  .ProgressRoot {
    grid-area: progress;
    height: 3rem;
    overflow: hidden;
    border-radius: 6px;
    transform: translateZ(0);
    background: ${(props) => props.theme['gray-100']};

    span {
      font-size: 1.2rem;
    }
  }

  .ProgressIndicator {
    position: relative;
    background-color: ${(props) => props.theme['red-300']};
    width: 100%;
    height: 100%;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  .ProgressContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: ${(props) => props.theme['gray-900']};
  }
`

export const SliderContent = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`

export const SliderItemTitle = styled.span``

interface SliderItemValueProps {
  variant?: 'red' | 'green'
}

export const SliderItemValue = styled.strong<SliderItemValueProps>`
  font-size: 1.4rem;
  color: ${(props) => props.theme[`${props.variant}-300`]};
`
