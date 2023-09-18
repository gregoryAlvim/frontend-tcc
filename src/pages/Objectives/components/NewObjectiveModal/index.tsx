import { useState } from 'react'
import { NewObjectiveFormOne } from '../NewObjectiveFormOne'
import { ModalScreen } from '../../../../components/ModalScreen'
import { Suggestion, ObjectivePreview } from '../../../../@types/mockes'
import { NewObjectiveSelectSuggestion } from '../NewObjectiveSelectSuggestion'

export function NewObjectiveModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [objective, setObjective] = useState({} as ObjectivePreview)

  function handleChangeStepForm(step: number) {
    setCurrentStep(step)
  }

  function resetStepForm() {
    handleChangeStepForm(1)
  }

  function handleSuggestionsDataFromFormOne(data: Suggestion[]) {
    setSuggestions(data)
    handleChangeStepForm(2)
  }

  function handlePreObjectiveDataFromFormOne(data: ObjectivePreview) {
    setObjective(data)
  }

  return (
    <ModalScreen title="Novo objetivo" actionToClosed={resetStepForm}>
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
          changeStepForm={handleChangeStepForm}
        />
      )}
    </ModalScreen>
  )
}
