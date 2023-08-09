import * as S from './styles'
import { Summary } from '../../components/Summary'
import { MonthlyBalance } from './components'

export function Dashboard() {
  return (
    <S.DashboardContainer>
      <S.DashboardTitle>Dashboard</S.DashboardTitle>

      <Summary />

      <S.DashboardSubTitle>Balanço mensal</S.DashboardSubTitle>

      <MonthlyBalance />

      <S.DashboardSubTitle>Planejamentos</S.DashboardSubTitle>
    </S.DashboardContainer>
  )
}
