import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  RocketLaunch,
} from 'phosphor-react'
import * as S from './styles'
import { Summary } from '../../components/Summary'
import { useState } from 'react'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { PlanningContext } from '../../contexts/plannings/PlanningContext'
import { useContextSelector } from 'use-context-selector'
import { Planning } from '../../@types/mockes'
import { NoPlanningOfMonth } from './components/NoPlanningOfMonth'
import { priceFormatter } from '../../utils/formatter'

export function Plannings() {
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [currentPlanning, setCurrentPlanning] = useState<Planning | null>(null)

  const plannings = useContextSelector(PlanningContext, (context) => {
    return context.plannings
  })

  function filterPlanningByMonth(month: string) {
    const result = plannings.filter((planning) => planning.month === month)

    setCurrentPlanning(result[0])
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date)

    // const year = date?.getFullYear()
    const month = (date?.getMonth() + 1).toString()

    filterPlanningByMonth(month)
  }

  const cardsToSummary = [
    {
      title: 'Receitas do mês',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: priceFormatter.format(0),
    },
    {
      title: 'Gastos planejados',
      icon: <ArrowCircleDown size={32} color="#F75A68" />,
      value: priceFormatter.format(0),
    },
    {
      title: 'Balanço planejado',
      icon: <RocketLaunch size={32} color="#8047F8" />,
      value: priceFormatter.format(0),
    },
  ]

  return (
    <S.PlanningsContainer>
      <S.PlanningsHeader>
        <S.PlanningsTitle>Planejamentos</S.PlanningsTitle>
      </S.PlanningsHeader>

      <Summary cards={cardsToSummary} />

      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <S.PlanningsContent>
        {currentPlanning ? '' : <NoPlanningOfMonth />}
      </S.PlanningsContent>
    </S.PlanningsContainer>
  )
}
