import styled from 'styled-components'

export const FormStepThree = styled.form`
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

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .TotalMonthlyRevenue {
    font-size: 1.8rem;
    color: ${(props) => props.theme['gray-400']};
  }
`

export const CategoryCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
