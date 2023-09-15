import styled from 'styled-components'

export const FormStepThree = styled.form`
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
