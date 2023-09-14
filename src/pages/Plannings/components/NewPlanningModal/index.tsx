import { useState } from 'react'
import { NewPlanningStepOne } from '../NewPlanningStepOne'
import { NewPlanningStepTwo } from '../NewPlanningStepTwo'
import { ModalScreen } from '../../../../components/ModalScreen'
import { Category } from '../../../../@types/mockes'
import { NewPlanningStepThree } from '../NewPlanningStepThree'
import { ModalContent } from './styles'

export function NewPlanningModal() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dataStepOne, setDataStepOne] = useState<number>(0)
  const [dataStepTwo, setDataStepTwo] = useState<Category[]>([])

  function handleChangeStepForm(step: number) {
    setCurrentStep(step)
  }

  function handleDataFromStepOneForm(totalMonthlyRevenue: number) {
    setDataStepOne(totalMonthlyRevenue)
    handleChangeStepForm(2)
  }

  function handleDataFromStepTwoForm(data: Category[]) {
    setDataStepTwo(data)
    handleChangeStepForm(3)
  }

  return (
    <ModalScreen title="Planejamento do mês">
      <ModalContent>
        {currentStep === 1 && (
          <NewPlanningStepOne
            handleSetDataStepOne={handleDataFromStepOneForm}
          />
        )}
        {currentStep === 2 && (
          <NewPlanningStepTwo
            handleSetDataStepTwo={handleDataFromStepTwoForm}
          />
        )}
        {currentStep === 3 && (
          <NewPlanningStepThree
            categories={dataStepTwo}
            totalMonthlyRevenue={dataStepOne}
          />
        )}
      </ModalContent>
    </ModalScreen>
  )
}
