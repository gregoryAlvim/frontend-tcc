import * as z from 'zod'
import * as S from './styles'

export function NewPlanningStepOne() {
  const newPlanningStepOneSchema = z.object({
    totalMonthlyRevenue: z.number(),
  })

  return (
    <S.FormStepOne>
      <p>Primeiro passo</p>
      <span>Informe qual é sua receita mensal total.</span>

      <S.InputContainer>
        <label htmlFor="totalMonthlyRevenue"> Insira um valor</label>

        <input id="totalMonthlyRevenue" type="number" />

        <button type="submit">Continuar</button>
      </S.InputContainer>
    </S.FormStepOne>
  )
}
