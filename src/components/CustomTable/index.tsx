import * as S from './styles'
import { Expense, Income } from '../../@types/mockes'
import { priceFormatter } from '../../utils/formatter'
import { CheckCircle, Hourglass, PencilSimple } from 'phosphor-react'
import { UpdateDialogButton } from '../UpdateDialogButton'

interface CustomTableProps {
  data: (Income | Expense)[]
  type?: 'income' | 'expense'
}

export function CustomTable({ data, type }: CustomTableProps) {
  function hasIsReceivedOrIsPay(item: any) {
    return item.category.type === 'income' ? item?.isReceived : item?.isPay
  }

  return (
    <S.TransactionsTable>
      <thead>
        <tr>
          <td>
            <strong>Situação</strong>
          </td>
          <td>
            <strong>Descrição</strong>
          </td>
          <td>
            <strong>Valor</strong>
          </td>
          <td>
            <strong>Categoria</strong>
          </td>
          <td>
            <strong>Data</strong>
          </td>
          <td>
            <strong>Ação</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              {hasIsReceivedOrIsPay(item) ? (
                <CheckCircle size={18} color="#00B37E" />
              ) : (
                <Hourglass size={18} color="#F75A68" />
              )}
            </td>
            <td>{item.description}</td>
            <td>
              <S.PriceHighLight variant={item.category.type}>
                {item.category.type === 'expense' && '- '}
                {priceFormatter.format(item.value)}
              </S.PriceHighLight>
            </td>
            <td>{item.category.name}</td>

            <td>{item.date}</td>
            <td>
              {
                <UpdateDialogButton
                  type={type}
                  data={item}
                  icon={<PencilSimple size={18} />}
                />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </S.TransactionsTable>
  )
}
