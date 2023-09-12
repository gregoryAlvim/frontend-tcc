import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface NewPlanningStepOneProps {
  handleSetDataStepOne: (totalMonthlyRevenue: number) => void
}

export function NewPlanningStepOne({
  handleSetDataStepOne,
}: NewPlanningStepOneProps) {
  const newPlanningStepOneSchema = z.object({
    totalMonthlyRevenue: z.number(),
  })

  type NewPlanningStepOneInputs = z.infer<typeof newPlanningStepOneSchema>

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPlanningStepOneInputs>({
    resolver: zodResolver(newPlanningStepOneSchema),
  })

  async function handleTotalMonthlyRevenue(data: NewPlanningStepOneInputs) {
    const { totalMonthlyRevenue } = data
    handleSetDataStepOne(totalMonthlyRevenue)
  }

  return (
    <S.FormStepOne onSubmit={handleSubmit(handleTotalMonthlyRevenue)}>
      <strong>Primeiro passo</strong>
      <span>Informe qual é seu orçamento mensal de gastos.</span>

      <S.InputContainer>
        <label htmlFor="totalMonthlyRevenue"> Insira um valor</label>

        <input
          type="number"
          id="totalMonthlyRevenue"
          {...register('totalMonthlyRevenue', { valueAsNumber: true })}
        />

        <button type="submit" disabled={isSubmitting}>
          Continuar
        </button>
      </S.InputContainer>
    </S.FormStepOne>
  )
}
