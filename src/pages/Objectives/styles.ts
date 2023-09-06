import { styled } from 'styled-components'

export const ObjectivesContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 8rem auto 0;
  padding: 0 1.5rem;
`

export const ObjectivesHeader = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;

  margin-bottom: 2rem;
`

export const ObjectivesTitle = styled.h1`
  margin-bottom: 2rem;
`

export const CardsContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
  height: 50vh;
  overflow-y: auto;
`

export const CardItem = styled.div`
  display: grid;
  grid-template-columns: 80% 1fr;
  grid-template-areas:
    'content' 'options'
    'progress' 'progress';

  padding: 2rem;
  height: 10rem;
  border-radius: 6px;
  background: ${(props) => props.theme['gray-700']};

  .ProgressRoot {
    grid-area: progress;
    height: 2rem;
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
    background-color: ${(props) => props.theme['green-500']};
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

export const CardContent = styled.div`
  grid-area: content;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .ObjectiveDescription {
    width: 20rem;
  }

  .ObjectiveDates {
    width: 50%;
  }
`

export const CardSpan = styled.span``

export const CardStrong = styled.strong`
  width: 4rem;
  text-align: end;
`

export const CardActions = styled.div`
  gap: 1rem;
  display: flex;
  grid-area: 'options';
  align-items: flex-start;
  justify-content: flex-end;

  .deleteButton {
    color: ${(props) => props.theme['red-300']};

    &:hover {
      color: ${(props) => props.theme['red-700']};
    }
  }

  .parcelsButton {
    color: ${(props) => props.theme['purple-300']};

    &:hover {
      color: ${(props) => props.theme['purple-500']};
    }
  }
`

export const ItemButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    transition: all 0.3s;
  }
`
