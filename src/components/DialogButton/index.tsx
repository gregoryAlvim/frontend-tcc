import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

interface DialogButtonProps {
  title: string
  icon: React.ReactNode
  type?: 'income' | 'expense'
  action: React.ReactNode
}

export function DialogButton({
  title,
  icon,
  type = 'income',
  action,
}: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <S.NewTransactionButton variant={type}>
          {icon}
          {title}
        </S.NewTransactionButton>
      </Dialog.Trigger>

      {action}
    </Dialog.Root>
  )
}
