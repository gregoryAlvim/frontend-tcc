import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

interface DialogButtonProps {
  title: string
  icon: React.ReactNode
}

export function DialogButton({ title, icon }: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <S.NewTransactionButton>
          {icon}
          {title}
        </S.NewTransactionButton>
      </Dialog.Trigger>

      <NewTransactionModal />
    </Dialog.Root>
  )
}
