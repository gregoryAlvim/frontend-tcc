import * as S from './styles'
import { Summary } from '../../components/Summary'

import { apiPrivate } from '../../lib/axios'
import { toast } from 'react-toastify'
import { MonthlyBalance } from './components/MonthlyBalance'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'

export function Dashboard() {
  const summary = useSummary()

  const cardsToSummary = [
    {
      title: 'Entradas',
      icon: <ArrowCircleUp size={32} color="#00b37e" />,
      value: summary.income,
    },
    {
      title: 'Saídas',
      icon: <ArrowCircleDown size={32} color="#f75a68" />,
      value: summary.expense,
    },
    {
      title: 'Total',
      icon: <CurrencyDollar size={32} color="#fff" />,
      value: summary.total,
    },
  ]

  return (
    <S.DashboardContainer>
      <S.DashboardTitle>Dashboard</S.DashboardTitle>

      <Summary cards={cardsToSummary} />

      <S.DashboardSubTitle>Balanço mensal</S.DashboardSubTitle>

      <MonthlyBalance />

      <S.DashboardSubTitle>Planejamentos</S.DashboardSubTitle>

      <span>fazer depois que a tela de planejamentos estiver pronta!</span>
    </S.DashboardContainer>
  )
}
