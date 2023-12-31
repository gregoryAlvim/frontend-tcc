import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiPrivate } from '../../../../lib/axios'
import { dateInputFormatter } from '../../../../utils/formatter'
import { ObjectivePreview, Suggestion } from '../../../../@types/mockes'
import { DefaultButton } from '../../../../components/DefaultButton'

interface NewObjectiveFormOneProps {
  handleSuggestions: (data: Suggestion[]) => void
  handlePreObjective: (data: ObjectivePreview) => void
}

export function NewObjectiveFormOne({
  handleSuggestions,
  handlePreObjective,
}: NewObjectiveFormOneProps) {
  const newObjectiveFormOneSchema = z.object({
    description: z.string().max(28),
    date: z.string(),
    goal: z.number().nonnegative(),
    initialValue: z.number().nonnegative(),
  })

  type NewObjectiveFormOneInputs = z.infer<typeof newObjectiveFormOneSchema>

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewObjectiveFormOneInputs>({
    resolver: zodResolver(newObjectiveFormOneSchema),
  })

  async function handleBuildObjectivesSuggestions(
    data: NewObjectiveFormOneInputs,
  ) {
    const { date, goal, initialValue, description } = data

    const formattedDate = dateInputFormatter(date)

    const response = await apiPrivate.post('objectives/build-suggestions', {
      goal,
      initialValue,
      date: formattedDate,
    })

    handlePreObjective({ date: formattedDate, goal, initialValue, description })
    handleSuggestions(response.data.data)
  }

  return (
    <>
      <S.FormContainer
        onSubmit={handleSubmit(handleBuildObjectivesSuggestions)}
      >
        <S.InputCard
          type="text"
          required
          placeholder="Descrição"
          {...register('description')}
        />

        <S.InputCard type="date" required {...register('date')} />

        <S.InputCard
          type="number"
          required
          placeholder="Meta"
          {...register('goal', { valueAsNumber: true })}
        />

        <S.InputCard
          type="number"
          required
          placeholder="Valor inicial"
          {...register('initialValue', { valueAsNumber: true })}
        />

        <DefaultButton
          type="submit"
          title="Gerar opções"
          disabled={isSubmitting}
        />
      </S.FormContainer>
    </>
  )
}
