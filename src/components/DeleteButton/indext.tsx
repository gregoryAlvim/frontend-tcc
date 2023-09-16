import * as S from './styles'
import { X } from 'phosphor-react'

interface DeleteButtonProps {
  actionOnClick: () => void
}

export function DeleteButton({ actionOnClick }: DeleteButtonProps) {
  return (
    <S.deleteItemButton onClick={actionOnClick}>
      <X />
    </S.deleteItemButton>
  )
}
