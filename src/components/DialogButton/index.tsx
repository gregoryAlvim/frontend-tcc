import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { UpdateTransactionModal } from '../UpdateTransactionModal'
import { Income, Expense } from '../../@types/mockes'

interface DialogButtonProps {
  title: string
  icon: React.ReactNode
  type?: 'income' | 'expense'
}

export function DialogButton({
  title,
  icon,
  type = 'income',
}: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <S.NewTransactionButton variant={type}>
          {icon}
          {title}
        </S.NewTransactionButton>
      </Dialog.Trigger>

      <NewTransactionModal typeOfButton={type} />
    </Dialog.Root>
  )
}
