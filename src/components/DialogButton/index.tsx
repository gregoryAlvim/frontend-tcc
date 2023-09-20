import * as S from './styles'
import * as Dialog from '@radix-ui/react-dialog'

interface DialogButtonProps {
  title?: string
  icon: React.ReactNode
  type?: 'income' | 'expense'
  action: React.ReactNode
  noBorder?: boolean
}

export function DialogButton({
  icon,
  title,
  action,
  type = 'income',
  noBorder = false,
}: DialogButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {noBorder ? (
          <S.OpenModalButton>{icon}</S.OpenModalButton>
        ) : (
          <S.NewItemButton variant={type}>
            {icon}
            {title}
          </S.NewItemButton>
        )}
      </Dialog.Trigger>

      {action}
    </Dialog.Root>
  )
}
