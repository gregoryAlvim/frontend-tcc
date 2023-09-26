import { DeleteItemModal } from '../DeleteItemModal'
import { DialogButton } from '../DialogButton'
import * as S from './styles'
import { X } from 'phosphor-react'

interface DeleteButtonProps {
  actionOnClick: () => void
}

export function DeleteButton({ actionOnClick }: DeleteButtonProps) {
  return (
    <DialogButton
      noBorder
      icon={<X color="#F75A68" />}
      action={<DeleteItemModal action={actionOnClick} />}
    />
  )
}
