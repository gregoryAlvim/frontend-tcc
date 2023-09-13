import * as z from 'zod'
import * as S from './styles'
import { Category } from '../../../../@types/mockes'
import { priceFormatter } from '../../../../utils/formatter'

interface NewPlanningStepThreeProps {
  totalMonthlyRevenue: number
  categories: Category[]
}

export function NewPlanningStepThree({
  categories,
  totalMonthlyRevenue,
}: NewPlanningStepThreeProps) {
  const categorySchema = z.object({})

  return (
    <S.FormStepThree>
      <strong>Planejamento por categorias</strong>
      <span>
        Está na hora de definir suas metas. Atribua o valor que desejar a cada
        categoria selecionada.
      </span>

      <p>Total</p>
      <p>{priceFormatter.format(totalMonthlyRevenue)}</p>

      {categories.map((category) => (
        <S.CategoryCard key={category.id}>
          <label htmlFor={category.name}>{category.name}</label>

          <input id={category.name} type="text" />
        </S.CategoryCard>
      ))}

      <button type="submit">Salvar Planejamento</button>
    </S.FormStepThree>
  )
}
