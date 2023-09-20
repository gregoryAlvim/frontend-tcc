import * as S from './styles'
import { useState } from 'react'
import * as Switch from '@radix-ui/react-switch'
import { useContextSelector } from 'use-context-selector'
import { Circle, PencilSimple, Plus } from 'phosphor-react'
import { DialogButton } from '../../components/DialogButton'
import { NewCategoryModal } from './components/NewCategoryModal'
import { CategoriesContext } from '../../contexts/categories/CategoriesContext'

export function Categories() {
  const [typeChecked, setTypeChecked] = useState(false)

  const { categoriesToExpense, categoriesToIncome } = useContextSelector(
    CategoriesContext,
    (context) => {
      return context
    },
  )

  return (
    <S.CategoriesContainer>
      <S.CategoriesHeader>
        <h2>Categorias</h2>

        <S.SwitchTypeContainer>
          <S.SwitchType className={typeChecked === false ? 'SelectedType' : ''}>
            Despesa
          </S.SwitchType>

          <Switch.Root
            className="SwitchRoot"
            onCheckedChange={(check) => setTypeChecked(check)}
          >
            <Switch.Thumb className="SwitchThumb" asChild>
              <Circle size={18} />
            </Switch.Thumb>
          </Switch.Root>

          <S.SwitchType className={typeChecked === true ? 'SelectedType' : ''}>
            Receita
          </S.SwitchType>
        </S.SwitchTypeContainer>

        <DialogButton
          action={<NewCategoryModal typeOfCategory={typeChecked} />}
          type="income"
          title="Adicionar"
          icon={<Plus />}
        />
      </S.CategoriesHeader>

      <table>
        <thead>
          <tr>
            <td>
              <strong>Categoria</strong>
            </td>
            <td>
              <strong>Tipo</strong>
            </td>
            <td>
              <strong>Ação</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {(typeChecked ? categoriesToIncome : categoriesToExpense).map(
            (category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.type === 'expense' ? 'Saída' : 'Entrada'}</td>
                <td>
                  <DialogButton
                    title=""
                    noBorder
                    icon={<PencilSimple />}
                    action={
                      <NewCategoryModal
                        selectedCategory={category}
                        typeOfCategory={typeChecked}
                      />
                    }
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </S.CategoriesContainer>
  )
}
