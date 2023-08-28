import * as S from './styles'
import { useState } from 'react'
import { Menu } from '../../components/Menu'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { CustomTable } from '../../components/CustomTable'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { useIncomesSummary } from '../../hooks/useIncomesSummary'
import { IncomeContext } from '../../contexts/income/IncomeContext'
import { Plus, Hourglass, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { DialogButton } from '../../components/DialogButton'

export function Incomes() {
  const currentDate = new Date()
  const summary = useIncomesSummary()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const { incomes, fetchIncomes } = useContextSelector(
    IncomeContext,
    (context) => {
      return context
    },
  )

  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <Hourglass size={32} color="#FFA500" />,
      value: summary.pendentes,
    },
    {
      title: 'Recebidas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: summary.recebidas,
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#fff" />,
      value: summary.previsto,
    },
  ]

  const handleDateChange = (date: any) => {
    setSelectedDate(date)

    const year = date?.getFullYear()
    const month = date?.getMonth() + 1
    fetchIncomes(month, year)
  }

  return (
    <S.IncomesContainer>
      <S.IncomesHeader>
        <Menu initialIndexSelected={1} />

        <DialogButton title="Nova receita" icon={<Plus />} />
      </S.IncomesHeader>
      <Summary cards={cardsToSummary} />
      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CustomTable data={incomes} />
    </S.IncomesContainer>
  )
}
