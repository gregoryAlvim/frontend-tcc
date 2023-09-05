import * as S from './styles'
import { CheckCircle } from 'phosphor-react'
import * as Switch from '@radix-ui/react-switch'
import { useState } from 'react'

interface SwitchParcelProps {
  parcelId: string | undefined
}

export function SwitchParcel({ parcelId }: SwitchParcelProps) {
  const [value, setValue] = useState<boolean>(false)

  function updateCheckedParcel(parcelId: string, checked: boolean) {}

  function handleCheckedChange(checked: boolean) {
    setValue(checked)
  }

  return (
    <S.SwitchContainer>
      <Switch.Root
        onCheckedChange={(checked: boolean) => handleCheckedChange(checked)}
        className="SwitchRoot"
      >
        <Switch.Thumb className="SwitchThumb" asChild>
          <CheckCircle size={18} />
        </Switch.Thumb>
      </Switch.Root>
    </S.SwitchContainer>
  )
}
