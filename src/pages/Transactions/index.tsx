import * as S from './styles'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { SearchForm } from './components/SearchForm/Index'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighLight variant={transaction.type}>
                    {transaction.type === 'expense' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </S.PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}
