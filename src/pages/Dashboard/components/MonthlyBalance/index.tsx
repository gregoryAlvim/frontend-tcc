import * as S from './styles'
import { useState, useEffect } from 'react'
import * as Progress from '@radix-ui/react-progress'
import * as Separator from '@radix-ui/react-separator'
import { useSummary } from '../../../../hooks/useSummary'
import { priceFormatter } from '../../../../utils/formatter'

export function MonthlyBalance() {
  const summary = useSummary()

  const [progress, setProgress] = useState({
    toIncome: 0,
    toExpense: 0,
  })

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setProgress({
          toIncome: 100,
          toExpense:
            Number((summary.expense / summary.income).toFixed(2)) * 100,
        }),
      100,
    )

    return () => clearTimeout(timer)
  })

  return (
    <S.MonthlyBalanceContainer>
      <S.MonthlyBalanceItem variant="amount">
        <span>Receitas</span>

        <Progress.Root
          className="ProgressRoot"
          value={progress.toIncome - progress.toExpense}
        >
          <Progress.Indicator
            className="ProgressIndicator"
            style={{
              transform: `translateX(-${
                100 - (progress.toIncome - progress.toExpense)
              }%)`,
            }}
          />
          <span className="ProgressContent">
            {progress.toIncome - progress.toExpense}%
          </span>
        </Progress.Root>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.MonthlyBalanceItem>

      <S.MonthlyBalanceItem>
        <span>Despesas</span>

        <Progress.Root className="ProgressRoot" value={progress.toExpense}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{ transform: `translateX(-${100 - progress.toExpense}%)` }}
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
