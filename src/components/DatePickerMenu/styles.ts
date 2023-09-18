import styled from 'styled-components'

export const MenuTable = styled.div`
  width: 100%;
  height: 6rem;
  margin-top: 4rem;
  background: ${(props) => props.theme['gray-700']};
  display: flex;
  align-items: center;
  justify-content: center;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  .custom-datepicker {
    /* Estilize o componente como desejar */
    cursor: pointer;
    width: 15rem;
    border: 1px solid ${(props) => props.theme['purple-500']};
    color: ${(props) => props.theme['gray-300']};
    border-radius: 6px;

    padding: 1rem;
    background: transparent;
    text-align: center;
  }

  /* Personalize os elementos internos do componente */
  .react-datepicker-wrapper {
    /* Estilize o input */
  }

  .react-datepicker__month-container {
    /* Estilize o container do calendário */
    width: 15rem;
    height: 15rem;
    background: ${(props) => props.theme['gray-700']};
  }

  .react-datepicker__month-text {
    color: ${(props) => props.theme['gray-100']};

    &:hover {
      color: ${(props) => props.theme['gray-900']};
    }
  }

  .react-datepicker__month-text--keyboard-selected {
    color: ${(props) => props.theme['gray-900']};
  }

  .react-datepicker__header {
    font-size: 1.2rem;
    background: ${(props) => props.theme['gray-700']};
    color: ${(props) => props.theme['gray-100']};
  }

  .react-datepicker__month {
    font-size: 1.2rem;
  }
`
