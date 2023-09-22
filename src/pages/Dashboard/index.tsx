import * as S from './styles'
import { useState } from 'react'
import { Summary } from '../../components/Summary'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { MonthlyBalance } from './components/MonthlyBalance'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { PlanningsSlider } from './components/PlanningsSlider'
import { DatePickerMenu } from '../../components/DatePickerMenu'

export function Dashboard() {
  const { summary, fetchTransactions } = useSummary()

  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const selectedMonth = (selectedDate.getMonth() + 1).toString()

  const handleDateChange = (date: any) => {
    setSelectedDate(date)

    const year = date?.getFullYear()
    const month = date?.getMonth() + 1
    fetchTransactions(month, year)
  }

  const cardsToSummary = [
    {
      title: 'Entradas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.income),
    },
    {
      title: 'Saídas',
      icon: <ArrowCircleDown size={32} color="#f75a68" />,
      value: priceFormatter.format(summary.expense),
    },
    {
      title: 'Total',
      icon: <CurrencyDollar size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.total),
    },
  ]

  return (
    <S.DashboardContainer>
      <DatePickerMenu
        noBackground={true}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />

      <S.DashboardTitle>Dashboard</S.DashboardTitle>

      <Summary cards={cardsToSummary} />

      <S.DashboardSubTitle>Balanço mensal</S.DashboardSubTitle>

      <MonthlyBalance />

      <S.DashboardSubTitle>Planejamentos</S.DashboardSubTitle>

      <PlanningsSlider selectedMonth={selectedMonth} />
    </S.DashboardContainer>
  )
}
