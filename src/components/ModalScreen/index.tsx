import * as S from './styles'
import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalScreenProps {
  title: string
  children: React.ReactNode
}

export function ModalScreen({ title, children }: ModalScreenProps) {
  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>{title}</Dialog.Title>

        {children}

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>
      </S.Content>
    </Dialog.Portal>
  )
}
