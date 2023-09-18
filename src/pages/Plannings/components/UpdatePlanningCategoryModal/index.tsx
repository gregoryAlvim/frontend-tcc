import * as z from 'zod'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlanningByCategory } from '../../../../@types/mockes'
import { ModalScreen } from '../../../../components/ModalScreen'
import { DefaultButton } from '../../../../components/DefaultButton'
import { simulateEscapeKey } from '../../../../utils/simulateEscapeKey'
import { useContextSelector } from 'use-context-selector'
import { PlanningContext } from '../../../../contexts/plannings/PlanningContext'

const updatePlanningCategorySchema = z.object({
  category_uuid: z.string(),
  goal: z.number(),
})

type UpdatePlanningCategoryInputs = z.infer<typeof updatePlanningCategorySchema>

interface UpdatePlanningCategoryModalProps {
  data: PlanningByCategory
}

export function UpdatePlanningCategoryModal({
  data,
}: UpdatePlanningCategoryModalProps) {
  const subPlanningId = data.id
  const updatePlanningByCategory = useContextSelector(
    PlanningContext,
    (context) => {
      return context.updatePlanningByCategory
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdatePlanningCategoryInputs>({
    resolver: zodResolver(updatePlanningCategorySchema),
    defaultValues: {
      goal: data.goal,
      category_uuid: data.category.id,
    },
  })

  function handleUpdatePlanningCategory(data: UpdatePlanningCategoryInputs) {
    if (subPlanningId !== undefined) {
      updatePlanningByCategory(subPlanningId, data)
      simulateEscapeKey()
    }
  }

  return (
    <ModalScreen title="Atualizar planejamento">
      <form
        id="updateSubPlanningForm"
        onSubmit={handleSubmit(handleUpdatePlanningCategory)}
      >
        <S.CardToGoal>
          <label htmlFor="goalSubPlanning">{data.category.name}</label>

          <input
            id="goalSubPlanning"
            {...register(`goal`, {
              valueAsNumber: true,
            })}
            type="number"
          />
        </S.CardToGoal>

        <input
          type="hidden"
          {...register(`category_uuid`)}
          value={data.category.id}
        />

        <S.ActionsContainer>
          <DefaultButton
            title="Cancelar"
            disabled={isSubmitting}
            className="cancelButton"
            actionOnClick={simulateEscapeKey}
          />
          <DefaultButton
            type="submit"
            title="Salvar"
            disabled={isSubmitting}
            form="updateSubPlanningForm"
          />
        </S.ActionsContainer>
      </form>
    </ModalScreen>
  )
}
