import * as S from './styles'
import { Summary } from '../../components/Summary'

import { apiPrivate } from '../../lib/axios'
import { toast } from 'react-toastify'
import { MonthlyBalance } from './components/MonthlyBalance'

export function Dashboard() {
  return (
    <S.DashboardContainer>
      <S.DashboardTitle>Dashboard</S.DashboardTitle>

      <Summary />

      <S.DashboardSubTitle>Balanço mensal</S.DashboardSubTitle>

      <MonthlyBalance />

      <S.DashboardSubTitle>Planejamentos</S.DashboardSubTitle>

      <span>fazer depois que a tela de planejamentos estiver pronta!</span>
    </S.DashboardContainer>
  )
}
