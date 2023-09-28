import styled from 'styled-components'

export const MonthlyBalanceContainer = styled.article`
  width: 100%;
  height: 20vh;
  padding: 2rem;
  border-radius: 6px;
  background: ${(props) => props.theme['gray-600']};

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .SeparatorRoot {
    background-color: ${(props) => props.theme['gray-400']};
  }

  .SeparatorRoot[data-orientation='horizontal'] {
    height: 2px;
    width: 100%;
  }
  .SeparatorRoot[data-orientation='vertical'] {
    width: 1px;
    height: 100%;
  }

  @media (max-width: 750px) {
    height: 100%;
  }
`

interface MonthlyBalanceItemProps {
  variant?: 'amount' | 'expense'
}

export const MonthlyBalanceItem = styled.div<MonthlyBalanceItemProps>`
  display: grid;
  align-items: end;
  grid-template-columns: 150px 2fr 200px;

  span {
    color: ${(props) => props.theme['white-300']};
  }

  strong {
    text-align: end;
    color: ${(props) =>
      props.variant === 'amount'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  .lastStrong {
    color: ${(props) => props.theme['white-300']};
  }

  .ProgressRoot {
    height: 2rem;
    overflow: hidden;
    border-radius: 6px;
    transform: translateZ(0);
    background: ${(props) => props.theme['gray-100']};
  }

  .ProgressIndicator {
    position: relative;
    background-color: ${(props) =>
      props.variant === 'amount'
        ? props.theme['green-300']
        : props.theme['red-300']};
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

  @media (max-width: 750px) {
    grid-template-columns: 150px;
    gap: 1rem;

    strong {
      text-align: start;
    }
  }
`
