import { useState } from 'react'
import { ModalScreen } from '../../../../components/ModalScreen'
import { NewPlanningStepOne } from '../NewPlanningStepOne'

export function NewPlanningModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  function handleChangeStepForm(step: number) {
    setCurrentStep(step)
  }

  return (
    <ModalScreen title="Planejamento do mês">
      {currentStep === 1 && <NewPlanningStepOne />}
    </ModalScreen>
  )
}
