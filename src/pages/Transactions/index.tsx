import * as S from './styles'
import { Menu } from './components/Menu'
import { Doughnut } from 'react-chartjs-2'
import { useCallback, useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Category, Expense, Income } from '../../@types/mockes'
import { IncomeContext } from '../../contexts/income/IncomeContext'
import { ExpenseContext } from '../../contexts/expense/ExpenseContext'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CategoriesContext } from '../../contexts/categories/CategoriesContext'
import { priceFormatter } from '../../utils/formatter'

ChartJS.register(ArcElement, Tooltip, Legend)

// Despesas por categorias
// Receitas por categorias

interface AccumulatedCategoryProps {
  total: number
  category: Category
}

interface GraphicDataProps {
  dataIncomesCategory: AccumulatedCategoryProps[]
  dataExpensesCategory: AccumulatedCategoryProps[]
}

export function Transactions() {
  const [graphicData, setGraphicData] = useState<GraphicDataProps>({
    dataIncomesCategory: [],
    dataExpensesCategory: [],
  })

  const { categoriesToExpense, categoriesToIncome } = useContextSelector(
    CategoriesContext,
    (context) => {
      return context
    },
  )

  const expenses = useContextSelector(ExpenseContext, (context) => {
    return context.expenses
  })

  const incomes = useContextSelector(IncomeContext, (context) => {
    return context.incomes
  })

  const accumulateCategoryWithValue = useCallback(
    (category: string, arrayData: Income[] | Expense[]) => {
      const dataByCategory = arrayData.filter(
        (expense) => expense.category.name === category,
      )

      const accumulatedCategory = dataByCategory?.reduce(
        (acc, expense) => {
          if (expense.category.name === category) {
            acc.category = expense.category
            acc.total += expense.value
          }
          return acc
        },
        { total: 0 } as AccumulatedCategoryProps,
      )

      return accumulatedCategory
    },
    [],
  )

  useEffect(() => {
    const dataExpensesCategory = categoriesToExpense.map((category) =>
      accumulateCategoryWithValue(category.name, expenses),
    )

    const dataIncomesCategory = categoriesToIncome.map((category) =>
      accumulateCategoryWithValue(category.name, incomes),
    )

    setGraphicData({ dataExpensesCategory, dataIncomesCategory })
  }, [
    incomes,
    expenses,
    categoriesToIncome,
    categoriesToExpense,
    accumulateCategoryWithValue,
  ])

  const dataExpenseByCategory = {
    labels: graphicData.dataExpensesCategory
      .filter((item) => item.total !== 0)
      .map((item) => item.category?.name),
    datasets: [
      {
        label: 'Total',
        data: graphicData.dataExpensesCategory
          .filter((item) => item.total !== 0)
          .map((item) => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const dataIncomeByCategory = {
    labels: graphicData.dataIncomesCategory
      .filter((item) => item.total !== 0)
      .map((item) => item.category?.name),
    datasets: [
      {
        label: 'Total',
        data: graphicData.dataIncomesCategory
          .filter((item) => item.total !== 0)
          .map((item) => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <S.TransactionsContainer>
      <S.TransactionsHeader>
        <Menu initialIndexSelected={0} />
      </S.TransactionsHeader>
      <S.GraphicsContainer>
        <S.GraphicsItem>
          <span>Receitas por categorias</span>
          <Doughnut data={dataIncomeByCategory} />
        </S.GraphicsItem>

        <S.GraphicsItem>
          <span>Despesas por categorias</span>
          <Doughnut data={dataExpenseByCategory} />
        </S.GraphicsItem>
      </S.GraphicsContainer>
    </S.TransactionsContainer>
  )
}
