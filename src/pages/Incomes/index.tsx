import {
  Plus,
  ArrowCircleUp,
  CurrencyDollar,
  ArrowCircleDown,
} from 'phosphor-react'
import * as S from './styles'
import { useCallback, useEffect, useState } from 'react'
import { Menu } from '../Transactions/components/Menu'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { CustomTable } from '../Transactions/components/CustomTable'
import { DatePickerMenu } from '../../components/DatePickerMenu'
import { useIncomesSummary } from '../../hooks/useIncomesSummary'
import { IncomeContext } from '../../contexts/income/IncomeContext'
import { DialogButton } from '../../components/DialogButton'
import { priceFormatter } from '../../utils/formatter'
import { NewTransactionModal } from '../Transactions/components/NewTransactionModal'
import { DatePickerContext } from '../../contexts/transactions/DatePickerContext'

export function Incomes() {
  const summary = useIncomesSummary()

  const { selectedDate, handleChangeSelectedDate } = useContextSelector(
    DatePickerContext,
    (context) => {
      return context
    },
  )

  const { incomes, fetchIncomes } = useContextSelector(
    IncomeContext,
    (context) => {
      return context
    },
  )

  const cardsToSummary = [
    {
      title: 'Pendentes',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.pendentes),
    },
    {
      title: 'Recebidas',
      icon: <ArrowCircleDown size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.recebidas),
    },
    {
      title: 'Previsto',
      icon: <CurrencyDollar size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.previsto),
    },
  ]

  const handleDateChange = useCallback(
    (date: any) => {
      handleChangeSelectedDate(date)

      const year = date?.getFullYear()
      const month = date?.getMonth() + 1
      fetchIncomes(month, year)
    },
    [handleChangeSelectedDate, fetchIncomes],
  )

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [handleDateChange, selectedDate])

  return (
    <S.IncomesContainer>
      <S.IncomesHeader>
        <Menu initialIndexSelected={1} />

        <DialogButton
          action={<NewTransactionModal typeOfButton="income" />}
          title="Nova receita"
          icon={<Plus />}
        />
      </S.IncomesHeader>
      <Summary cards={cardsToSummary} />
      <DatePickerMenu
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CustomTable type="income" data={incomes} />
    </S.IncomesContainer>
  )
}
