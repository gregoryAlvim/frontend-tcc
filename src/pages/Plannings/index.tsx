import * as S from './styles'
import { useEffect, useState } from 'react'
import { Planning } from '../../@types/mockes'
import { Summary } from '../../components/Summary'
import { priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { PlanningOfMonth } from './components/PlanningOfMonth'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { NoPlanningOfMonth } from './components/NoPlanningOfMonth'
import { usePlanningsSummary } from '../../hooks/usePlanningsSummary'
import { PlanningContext } from '../../contexts/plannings/PlanningContext'
import { ArrowCircleDown, ArrowCircleUp, RocketLaunch } from 'phosphor-react'

export function Plannings() {
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [currentPlanning, setCurrentPlanning] = useState<Planning | null>(null)
  const selectedMonth = (selectedDate.getMonth() + 1).toString()

  const plannings = useContextSelector(PlanningContext, (context) => {
    return context.plannings
  })

  const dataToSummary = usePlanningsSummary()

  const cardsToSummary = [
    {
      title: 'Receitas do mês',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: currentPlanning
        ? priceFormatter.format(dataToSummary?.incomesSummary?.previsto)
        : priceFormatter.format(0),
    },
    {
      title: 'Gastos planejados',
      icon: <ArrowCircleDown size={32} color="#F75A68" />,
      value: currentPlanning
        ? priceFormatter.format(currentPlanning.goal)
        : priceFormatter.format(0),
    },
    {
      title: 'Balanço planejado',
      icon: <RocketLaunch size={32} color="#8047F8" />,
      value: currentPlanning
        ? priceFormatter.format(
            dataToSummary?.incomesSummary?.previsto - currentPlanning.goal,
          )
        : priceFormatter.format(0),
    },
  ]

  function filterPlanningByMonth(month: string) {
    const result = plannings.filter((planning) => planning.month === month)

    if (result.length === 0) {
      setCurrentPlanning(null)
    }

    setCurrentPlanning(result[0])
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date)

    const year = date?.getFullYear()
    const month = (date?.getMonth() + 1).toString()

    filterPlanningByMonth(month)
    dataToSummary.fetchTransactions(month, year)
  }

  useEffect(() => {
    filterPlanningByMonth(selectedMonth)
  })

  return (
    <S.PlanningsContainer>
      <S.PlanningsHeader>
        <S.PlanningsTitle>Planejamento Mensal</S.PlanningsTitle>
      </S.PlanningsHeader>

      <Summary cards={cardsToSummary} />

      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <S.PlanningsContent>
        {currentPlanning ? (
          <PlanningOfMonth data={currentPlanning} />
        ) : (
          <NoPlanningOfMonth />
        )}
      </S.PlanningsContent>
    </S.PlanningsContainer>
  )
}
