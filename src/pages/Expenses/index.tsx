import {
  Plus,
  ArrowCircleUp,
  CurrencyDollar,
  ArrowCircleDown,
} from 'phosphor-react'
import * as S from './styles'
import { useCallback, useEffect, useState } from 'react'
import { Summary } from '../../components/Summary'
import { Menu } from '../Transactions/components/Menu'
import { priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { DialogButton } from '../../components/DialogButton'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { useExpensesSummary } from '../../hooks/useExpenseSummary'
import { CustomTable } from '../Transactions/components/CustomTable'
import { ExpenseContext } from '../../contexts/expense/ExpenseContext'
import { NewTransactionModal } from '../Transactions/components/NewTransactionModal'
import { DatePickerContext } from '../../contexts/transactions/DatePickerContext'

export function Expenses() {
  const summary = useExpensesSummary()

  const { selectedDate, handleChangeSelectedDate } = useContextSelector(
    DatePickerContext,
    (context) => {
      return context
    },
  )

  const { expenses, fetchExpenses } = useContextSelector(
    ExpenseContext,
    (context) => {
      return context
    },
  )
  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <ArrowCircleUp size={32} color="#F75A68" />,
      value: priceFormatter.format(summary.pendentes),
    },
    {
      title: 'Pagas',
      icon: <ArrowCircleDown size={32} color="#F75A68" />,
      value: priceFormatter.format(summary.pagas),
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#F75A68" />,
      value: priceFormatter.format(summary.previsto),
    },
  ]

  const handleDateChange = useCallback(
    (date: any) => {
      handleChangeSelectedDate(date)

      const year = date?.getFullYear()
      const month = date?.getMonth() + 1
      fetchExpenses(month, year)
    },
    [handleChangeSelectedDate, fetchExpenses],
  )

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [handleDateChange, selectedDate])

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
