import * as S from './styles.ts'
import { Suggestion } from '../../../../@types/mockes'
import { priceFormatter } from '../../../../utils/formatter.ts'

interface NewObjectiveSelectSuggestion {
  data: Suggestion[]
  handleSuggestion: (data: Suggestion) => void
}

export function NewObjectiveSelectSuggestion({
  data,
  handleSuggestion,
}: NewObjectiveSelectSuggestion) {
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
              <S.ButtonSelectCard onClick={() => handleSuggestion(suggestion)}>
                Confirmar seleção
              </S.ButtonSelectCard>
            </S.SuggestionCard>
          ))}
      </S.SuggestionsContent>
    </S.SuggestionsContainer>
  )
}
