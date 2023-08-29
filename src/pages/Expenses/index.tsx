import * as S from './styles'
import { useState } from 'react'
import { Menu } from '../../components/Menu'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { CustomTable } from '../../components/CustomTable'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { useExpensesSummary } from '../../hooks/useExpenseSummary'
import { ExpenseContext } from '../../contexts/expense/ExpenseContext'
import { ArrowCircleUp, CurrencyDollar, Hourglass, Plus } from 'phosphor-react'
import { DialogButton } from '../../components/DialogButton'

export function Expenses() {
  const currentDate = new Date()
  const summary = useExpensesSummary()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const { expenses, fetchExpenses } = useContextSelector(
    ExpenseContext,
    (context) => {
      return context
    },
  )
  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <Hourglass size={32} color="#F75A68" />,
      value: summary.pendentes,
    },
    {
      title: 'Pagas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: summary.pagas,
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
    fetchExpenses(month, year)
  }

  return (
    <S.ExpensesContainer>
      <S.ExpensesHeader>
        <Menu initialIndexSelected={2} />

        <DialogButton type="expense" title="Nova despesa" icon={<Plus />} />
      </S.ExpensesHeader>

      <Summary cards={cardsToSummary} />

      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CustomTable data={expenses} />
    </S.ExpensesContainer>
  )
}
