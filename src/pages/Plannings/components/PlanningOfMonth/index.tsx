import * as S from './styles'
import { Planning } from '../../../../@types/mockes'
import { tr } from 'date-fns/locale'
import { priceFormatter } from '../../../../utils/formatter'

interface PlanningOfMonthProps {
  data: Planning
}

export function PlanningOfMonth({ data }: PlanningOfMonthProps) {
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
              <strong>Total gasto</strong>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.PlanningOfMonthContainer>
  )
}
