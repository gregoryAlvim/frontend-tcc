import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiPrivate } from '../../../../lib/axios'
import { dateInputFormatter } from '../../../../utils/formatter'
import { Suggestion } from '../../../../@types/mockes'

interface NewObjectiveFormOneProps {
  handleSuggestions: (data: Suggestion[]) => void
}

export function NewObjectiveFormOne({
  handleSuggestions,
}: NewObjectiveFormOneProps) {
  const newObjectiveFormOneSchema = z.object({
    date: z.string(),
    goal: z.number(),
    initialValue: z.number(),
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
    const { date, goal, initialValue } = data

    const formattedDate = dateInputFormatter(date)

    const response = await apiPrivate.post('objectives/build-suggestions', {
      goal,
      initialValue,
      date: formattedDate,
    })

    handleSuggestions(response.data.data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleBuildObjectivesSuggestions)}>
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

        <button type="submit" disabled={isSubmitting}>
          Gerar opções
        </button>
      </form>
    </>
  )
}
