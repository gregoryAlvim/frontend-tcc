import * as S from './styles'
import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { undefined } from 'zod'

interface ModalScreenProps {
  title: string
  children: React.ReactNode
  actionToClosed?: () => void
}

export function ModalScreen({
  title,
  children,
  actionToClosed,
}: ModalScreenProps) {
  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>{title}</Dialog.Title>

        {children}

        <S.CloseButton onClick={actionToClosed}>
          <X size={24} />
        </S.CloseButton>
      </S.Content>
    </Dialog.Portal>
  )
}
