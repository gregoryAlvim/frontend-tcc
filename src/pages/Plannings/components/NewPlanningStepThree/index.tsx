import * as z from 'zod'
import * as S from './styles'
import { Category } from '../../../../@types/mockes'
import { priceFormatter } from '../../../../utils/formatter'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiPrivate } from '../../../../lib/axios'
import { useContextSelector } from 'use-context-selector'
import { PlanningContext } from '../../../../contexts/plannings/PlanningContext'
import { simulateEscapeKey } from '../../../../utils/simulateEscapeKey'

interface NewPlanningStepThreeProps {
  totalMonthlyRevenue: number
  categories: Category[]
}

export function NewPlanningStepThree({
  categories,
  totalMonthlyRevenue,
}: NewPlanningStepThreeProps) {
  const currentDate = new Date()

  const createNewPlanning = useContextSelector(PlanningContext, (context) => {
    return context.createNewPlanning
  })

  const categorySchema = z.object({
    category_uuid: z.string(),
    goal: z.number(),
  })

  const newPlanningStepThreeSchema = z.object({
    goalToCategories: z.array(categorySchema),
  })

  type NewPlanningStepThreeInputs = z.infer<typeof newPlanningStepThreeSchema>

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPlanningStepThreeInputs>({
    resolver: zodResolver(newPlanningStepThreeSchema),
  })

  async function handleGoalsToCategories(data: NewPlanningStepThreeInputs) {
    const { goalToCategories } = data
    const month = (currentDate.getMonth() + 1).toString()

    const planning = {
      month,
      goal: totalMonthlyRevenue,
    }

    const planningsByCategory = [...goalToCategories]

    createNewPlanning(planning, planningsByCategory)
  }

  return (
    <S.FormStepThree onSubmit={handleSubmit(handleGoalsToCategories)}>
      <strong>Planejamento por categorias</strong>
      <span>
        Está na hora de definir suas metas. Atribua o valor que desejar a cada
        categoria selecionada.
      </span>

      <S.TotalContainer>
        <p>Total</p>
        <p>{priceFormatter.format(totalMonthlyRevenue)}</p>
      </S.TotalContainer>

      {categories.map((category, index) => (
        <S.CategoryCard key={category.id}>
          <label htmlFor={category.name}>{category.name}</label>

          <input
            {...register(`goalToCategories.${index}.goal`, {
              valueAsNumber: true,
            })}
            type="number"
          />

          <input
            type="hidden"
            {...register(`goalToCategories.${index}.category_uuid`)}
            value={category.id}
          />
        </S.CategoryCard>
      ))}

      <button type="submit">Salvar Planejamento</button>
    </S.FormStepThree>
  )
}
