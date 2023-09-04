import {
  Objective,
  ObjectivePreview,
  Suggestion,
} from '../../../../@types/mockes'
import * as S from './styles'
import { useState } from 'react'
import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { NewObjectiveFormOne } from '../NewObjectiveFormOne'
import { NewObjectiveSelectSuggestion } from '../NewObjectiveSelectSuggestion'

export function NewObjectiveModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [objective, setObjective] = useState({} as ObjectivePreview)

  function handleChangeStepForm(step: number) {
    setCurrentStep(step)
  }

  function handleSuggestionsDataFromFormOne(data: Suggestion[]) {
    setSuggestions(data)
    handleChangeStepForm(2)
  }

  function handlePreObjectiveDataFromFormOne(data: ObjectivePreview) {
    setObjective(data)
  }

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Novo objetivo</Dialog.Title>

        {currentStep === 1 && (
          <NewObjectiveFormOne
            handlePreObjective={handlePreObjectiveDataFromFormOne}
            handleSuggestions={handleSuggestionsDataFromFormOne}
          />
        )}
        {currentStep === 2 && (
          <NewObjectiveSelectSuggestion
            data={suggestions}
            preObjective={objective}
          />
        )}
        {/* {currentStep === 3 && <NewObjectiveFormThree data={suggestion} />} */}

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
      </S.Content>
    </Dialog.Portal>
  )
}
