import * as S from './styles'
import { useState, useEffect } from 'react'
import * as Progress from '@radix-ui/react-progress'
import * as Separator from '@radix-ui/react-separator'
import { useSummary } from '../../../../hooks/useSummary'
import { priceFormatter } from '../../../../utils/formatter'

export function MonthlyBalance() {
  const { summary } = useSummary()

  const isExpenseBiggerThanIncome = summary.income < summary.expense

  const [progress, setProgress] = useState({
    toIncome: 0,
    toExpense: 0,
  })

  function checkPercentageNumber(value: number): number {
    if (value > 100) {
      return 100
    } else {
      return value
    }
  }

  function checkIfExpenseBiggerThanIncome(
    income: number,
    expense: number,
  ): number {
    if (isExpenseBiggerThanIncome) {
      return Number(((income / expense) * 100).toFixed(0))
    } else {
      return 100
    }
  }

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setProgress({
          toIncome: checkIfExpenseBiggerThanIncome(
            summary.income,
            summary.expense,
          ),
          toExpense: Number(
            ((summary.expense / summary.income) * 100).toFixed(0),
          ),
        }),
      100,
    )

    return () => clearTimeout(timer)
  })

  return (
    <S.MonthlyBalanceContainer>
      <S.MonthlyBalanceItem variant="amount">
        <span>Receitas</span>

        <Progress.Root className="ProgressRoot" value={100}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{
              transform: `translateX(-${
                isExpenseBiggerThanIncome
                  ? 100 - progress.toIncome
                  : 100 -
                    (progress.toIncome -
                      checkPercentageNumber(progress.toExpense))
              }%)`,
            }}
          />
          <span className="ProgressContent">
            {isExpenseBiggerThanIncome
              ? progress.toIncome
              : progress.toIncome - checkPercentageNumber(progress.toExpense)}
            %
          </span>
        </Progress.Root>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.MonthlyBalanceItem>

      <S.MonthlyBalanceItem>
        <span>Despesas</span>

        <Progress.Root className="ProgressRoot" value={100}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{
              transform: `translateX(-${
                100 - checkPercentageNumber(progress.toExpense)
              }%)`,
            }}
          />
          <span className="ProgressContent">{progress.toExpense}%</span>
        </Progress.Root>

        <strong>{priceFormatter.format(summary.expense)}</strong>
      </S.MonthlyBalanceItem>

      <Separator.Root className="SeparatorRoot" />

      <S.MonthlyBalanceItem>
        <span>Balanço</span>

        <div></div>

        <strong className="lastStrong">
          {priceFormatter.format(summary.total)}
        </strong>
      </S.MonthlyBalanceItem>
    </S.MonthlyBalanceContainer>
  )
}
