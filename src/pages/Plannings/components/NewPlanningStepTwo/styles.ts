import styled from 'styled-components'

export const FormStepTwo = styled.form`
  button[type='submit'] {
    height: 5rem;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }

  span {
    font-size: 1.4rem;
    margin-bottom: 3rem;
  }
`

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1.4rem;
  }
`
