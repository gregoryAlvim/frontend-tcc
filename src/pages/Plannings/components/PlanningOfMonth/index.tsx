import * as S from './styles'
import { Planning } from '../../../../@types/mockes'
import { priceFormatter } from '../../../../utils/formatter'
import { ExpenseContext } from '../../../../contexts/expense/ExpenseContext'
import { useContextSelector } from 'use-context-selector'

interface PlanningOfMonthProps {
  data: Planning
}

export function PlanningOfMonth({ data }: PlanningOfMonthProps) {
  const expenses = useContextSelector(ExpenseContext, (context) => {
    return context.expenses
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

    return totalValue
  }

  return (
    <S.PlanningOfMonthContainer>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Categoria</strong>
            </td>
            <td>
              <strong>Meta planejada</strong>
            </td>
            <td>
              <strong>Despesas pagas</strong>
            </td>
            <td>
              <strong>Despesas previstas</strong>
            </td>
            <td>
              <strong>Restam</strong>
            </td>
            <td>
              <strong>Ações</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.planningsByCategory.map((planningByCategory) => (
            <tr key={planningByCategory.id}>
              <td>{planningByCategory.category.name}</td>
              <td>{priceFormatter.format(planningByCategory.goal)}</td>
              <td>
                {priceFormatter.format(
                  filterExpenseByCategory(planningByCategory.category.name)
                    .pagas,
                )}
              </td>
              <td>
                {priceFormatter.format(
                  filterExpenseByCategory(planningByCategory.category.name)
                    .previstas,
                )}
              </td>
              <td>
                {priceFormatter.format(
                  planningByCategory.goal -
                    filterExpenseByCategory(planningByCategory.category.name)
                      .total,
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.PlanningOfMonthContainer>
  )
}
