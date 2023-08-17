import * as S from './styles'
import { useState } from 'react'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { SearchForm } from './components/SearchForm/Index'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { TransactionsContext } from '../../contexts/transactions/TransactionsContext'
import { Menu } from '../../components/Menu'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <S.TransactionsContainer>
      <S.TransactionsHeader>
        <Menu initialIndexSelected={0} />
      </S.TransactionsHeader>

      <SearchForm />

      <S.TransactionsTable>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <S.PriceHighLight variant={transaction.category.type}>
                  {transaction.category.type === 'expense' && '- '}
                  {priceFormatter.format(transaction.value)}
                </S.PriceHighLight>
              </td>
              <td>{transaction.category.name}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </S.TransactionsTable>
    </S.TransactionsContainer>
  )
}
