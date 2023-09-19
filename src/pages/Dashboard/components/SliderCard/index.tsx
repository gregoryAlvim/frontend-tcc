import * as S from './styles'
import { useEffect, useState } from 'react'
import * as Progress from '@radix-ui/react-progress'
import * as Separator from '@radix-ui/react-separator'
import { useContextSelector } from 'use-context-selector'
import { priceFormatter } from '../../../../utils/formatter'
import { PlanningByCategory } from '../../../../@types/mockes'
import { ExpenseContext } from '../../../../contexts/expense/ExpenseContext'

interface SliderCardProps {
  planningByCategory: PlanningByCategory
}

export function SliderCard({ planningByCategory }: SliderCardProps) {
  const expenses = useContextSelector(ExpenseContext, (context) => {
    return context.expenses
  })

  const [expensesCalc, setExpensesCalc] = useState({
    pagas: 0,
    previstas: 0,
    total: 0,
  })

  function filterExpenseByCategory(category: string) {
    const expensesByCategory = expenses.filter(
      (expense) => expense.category.name === category,
    )

    const totalValue = expensesByCategory?.reduce(
      (acc, expense) => {
        if (expense.category.name === category) {
          if (expense.isPay === true) {
            acc.pagas += expense.value
            acc.total += expense.value
          } else {
            acc.previstas += expense.value
            acc.total += expense.value
          }
        }

        return acc
      },
      { pagas: 0, previstas: 0, total: 0 },
    )

    setExpensesCalc(totalValue)
  }

  function calculatePlanningPercentage() {
    const planningPercentage = Number(
      ((expensesCalc.total / planningByCategory.goal) * 100).toFixed(0),
    )

    return planningPercentage
  }

  useEffect(() => {
    filterExpenseByCategory(planningByCategory.category.name)
  })

  return (
    <S.SliderCard>
      <h3>{planningByCategory.category.name}</h3>

      <Separator.Root className="SeparatorRoot" />

      <S.SliderContent>
        <S.SliderItemTitle>Orçamento</S.SliderItemTitle>
        <S.SliderItemValue>
          {priceFormatter.format(planningByCategory.goal)}
        </S.SliderItemValue>
      </S.SliderContent>

      <S.SliderContent>
        <S.SliderItemTitle>Total gasto</S.SliderItemTitle>
        <S.SliderItemValue variant="red">
          {priceFormatter.format(expensesCalc.total)}
        </S.SliderItemValue>
      </S.SliderContent>

      <S.SliderContent>
        <S.SliderItemTitle>Disponível</S.SliderItemTitle>
        <S.SliderItemValue variant="green">
          {priceFormatter.format(planningByCategory.goal - expensesCalc.total)}
        </S.SliderItemValue>
      </S.SliderContent>

      <Separator.Root className="SeparatorRoot" />
      <Progress.Root className="ProgressRoot" max={planningByCategory.goal}>
        <Progress.Indicator
          className="ProgressIndicator"
          style={{
            transform: `translateX(-${100 - calculatePlanningPercentage()}%)`,
          }}
        />
        <span className="ProgressContent">{`${calculatePlanningPercentage()}%`}</span>
      </Progress.Root>
    </S.SliderCard>
  )
}
