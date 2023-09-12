import { useState } from 'react'
import { NewPlanningStepOne } from '../NewPlanningStepOne'
import { NewPlanningStepTwo } from '../NewPlanningStepTwo'
import { ModalScreen } from '../../../../components/ModalScreen'

export function NewPlanningModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dataStepOne, setDataStepOne] = useState<number>(0)

  function handleChangeStepForm(step: number) {
    setCurrentStep(step)
  }

  function handleDataFromStepOneForm(totalMonthlyRevenue: number) {
    setDataStepOne(totalMonthlyRevenue)
    handleChangeStepForm(2)
  }

  return (
    <ModalScreen title="Planejamento do mês">
      {currentStep === 1 && (
        <NewPlanningStepOne handleSetDataStepOne={handleDataFromStepOneForm} />
      )}
      {currentStep === 2 && <NewPlanningStepTwo />}
    </ModalScreen>
  )
}
