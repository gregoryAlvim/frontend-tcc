import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { Category } from '../../../../@types/mockes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { priceFormatter } from '../../../../utils/formatter'
import { PlanningContext } from '../../../../contexts/plannings/PlanningContext'
import { DefaultButton } from '../../../../components/DefaultButton'

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
    goal: z.number().nonnegative(),
  })

  const newPlanningStepThreeSchema = z.object({
    goalToCategories: z.array(categorySchema),
  })

  type NewPlanningStepThreeInputs = z.infer<typeof newPlanningStepThreeSchema>

  const {
    register,
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
      <strong>Terceiro passo</strong>
      <span>
        Está na hora de definir suas metas. Atribua o valor que desejar a cada
        categoria selecionada.
      </span>

      <S.TotalContainer>
        <p>Total</p>
        <strong className="TotalMonthlyRevenue">
          {priceFormatter.format(totalMonthlyRevenue)}
        </strong>
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

      <DefaultButton
        type="submit"
        disabled={isSubmitting}
        title="Salvar Planejamento"
      />
    </S.FormStepThree>
  )
}
