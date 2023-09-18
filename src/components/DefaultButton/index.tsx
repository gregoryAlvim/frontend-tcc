import * as S from './styles'
import { ButtonHTMLAttributes } from 'react'

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  actionOnClick?: () => void
}

export function DefaultButton({
  title,
  actionOnClick,
  ...rest
}: DefaultButtonProps) {
  return (
    <S.Button onClick={actionOnClick} {...rest}>
      {title}
    </S.Button>
  )
}
