import * as S from './styles'
import { useState } from 'react'
import { Menu } from '../Transactions/components/Menu'
import { Summary } from '../../components/Summary'
import { priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { CustomTable } from '../Transactions/components/CustomTable'
import { DialogButton } from '../../components/DialogButton'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { useExpensesSummary } from '../../hooks/useExpenseSummary'
import { ExpenseContext } from '../../contexts/expense/ExpenseContext'
import { ArrowCircleUp, CurrencyDollar, Hourglass, Plus } from 'phosphor-react'
import { NewTransactionModal } from '../Transactions/components/NewTransactionModal'

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
      value: priceFormatter.format(summary.pendentes),
    },
    {
      title: 'Pagas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.pagas),
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#fff" />,
      value: priceFormatter.format(summary.previsto),
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

        <DialogButton
          action={<NewTransactionModal typeOfButton="expense" />}
          type="expense"
          title="Nova despesa"
          icon={<Plus />}
        />
      </S.ExpensesHeader>

      <Summary cards={cardsToSummary} />

      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CustomTable type="expense" data={expenses} />
    </S.ExpensesContainer>
  )
}
