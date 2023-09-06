import * as S from './styles.ts'
import { useContextSelector } from 'use-context-selector'
import { priceFormatter } from '../../../../utils/formatter.ts'
import { Suggestion, ObjectivePreview } from '../../../../@types/mockes'
import { simulateEscapeKey } from '../../../../utils/simulateEscapeKey.ts'
import { ObjectiveContext } from '../../../../contexts/objectives/ObjectiveContext.tsx'

interface NewObjectiveSelectSuggestion {
  data: Suggestion[]
  preObjective: ObjectivePreview
  changeStepForm: (step: number) => void
}

export function NewObjectiveSelectSuggestion({
  data,
  preObjective,
  changeStepForm,
}: NewObjectiveSelectSuggestion) {
  const createNewObjective = useContextSelector(ObjectiveContext, (context) => {
    return context.createNewObjective
  })

  function handleCreateTheObjective(suggestion: Suggestion) {
    createNewObjective(preObjective, suggestion)
    simulateEscapeKey()
    changeStepForm(1)
  }

  return (
    <S.SuggestionsContainer>
      <span>
        Selecione uma sugestão de reserva de acordo com o prazo desejado!
      </span>

      <S.SuggestionsContent>
        {data &&
          data.map((suggestion) => (
            <S.SuggestionCard key={suggestion.id}>
              <h2>{`${suggestion.name} prazo`}</h2>
              <p>{`${suggestion.amountParcels} x ${priceFormatter.format(
                suggestion.valueOfParcels,
              )}`}</p>
              <S.ButtonSelectCard
                onClick={() => handleCreateTheObjective(suggestion)}
              >
                Confirmar seleção
              </S.ButtonSelectCard>
            </S.SuggestionCard>
          ))}
      </S.SuggestionsContent>
    </S.SuggestionsContainer>
  )
}
