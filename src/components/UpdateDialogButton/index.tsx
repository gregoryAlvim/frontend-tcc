import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { UpdateTransactionModal } from '../UpdateTransactionModal'
import { Income, Expense } from '../../@types/mockes'

interface DialogButtonProps {
  icon: React.ReactNode
  type?: 'income' | 'expense'
  data: Income | Expense
}

export function UpdateDialogButton({
  icon,
  data,
  type = 'income',
}: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <S.NewTransactionButton variant={type}>{icon}</S.NewTransactionButton>
      </Dialog.Trigger>

      <UpdateTransactionModal data={data} typeOfButton={type} />
    </Dialog.Root>
  )
}
