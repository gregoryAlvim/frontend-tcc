import * as S from './styles'
import { useState } from 'react'
import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Suggestion } from '../../../../@types/mockes'
import { NewObjectiveFormOne } from '../NewObjectiveFormOne'
import { NewObjectiveFormThree } from '../NewObjectiveFormThree'
import { NewObjectiveSelectSuggestion } from '../NewObjectiveSelectSuggestion'

export function NewObjectiveModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [suggestion, setSuggestion] = useState({} as Suggestion)

  function handleStepForm(step: number) {
    setCurrentStep(step)
  }

  function handleSuggestionsDataFromFormOne(data: Suggestion[]) {
    setSuggestions(data)
    handleStepForm(2)
  }

  function handleSelectSuggestionFromStepTwo(data: Suggestion) {
    setSuggestion(data)
    handleStepForm(3)
  }

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Novo objetivo</Dialog.Title>

        {currentStep === 1 && (
          <NewObjectiveFormOne
            handleSuggestions={handleSuggestionsDataFromFormOne}
          />
        )}
        {currentStep === 2 && (
          <NewObjectiveSelectSuggestion
            data={suggestions}
            handleSuggestion={handleSelectSuggestionFromStepTwo}
          />
        )}
        {currentStep === 2 && <NewObjectiveFormThree />}

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
      </S.Content>
    </Dialog.Portal>
  )
}
