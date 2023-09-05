import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'

interface DialogButtonProps {
  title: string
  icon: React.ReactNode
  type?: 'income' | 'expense'
  action: React.ReactNode
  noBorder?: boolean
}

export function DialogButton({
  title,
  icon,
  type = 'income',
  noBorder = false,
  action,
}: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {noBorder ? (
          <S.OpenModalButton>{icon}</S.OpenModalButton>
        ) : (
          <S.NewTransactionButton variant={type}>
            {icon}
            {title}
          </S.NewTransactionButton>
        )}
      </Dialog.Trigger>

      {action}
    </Dialog.Root>
  )
}
