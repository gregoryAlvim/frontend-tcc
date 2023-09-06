import * as S from './styles'
import { CheckCircle } from 'phosphor-react'
import * as Switch from '@radix-ui/react-switch'
import { apiPrivate } from '../../../../lib/axios'
import { ToastMessages } from '../../../../utils/ToastMessages'
import { ObjectiveContext } from '../../../../contexts/objectives/ObjectiveContext'
import { useContextSelector } from 'use-context-selector'

interface SwitchParcelProps {
  parcelId: string | undefined
  isPaid: boolean | undefined
}

export function SwitchParcel({ parcelId, isPaid }: SwitchParcelProps) {
  const fetchObjectives = useContextSelector(ObjectiveContext, (context) => {
    return context.fetchObjectives
  })

  async function updateCheckedParcel(
    parcelId: string | undefined,
    checked: boolean,
  ) {
    if (parcelId !== undefined) {
      try {
        const response = await apiPrivate.patch(
          `parcels/update-parcel-by/${parcelId}`,
          {
            isPaid: checked,
          },
        )
        fetchObjectives()
        ToastMessages.showToastSuccess(response.data.message)
      } catch (error: any) {
        if (error.response.status) {
          ToastMessages.showToastError(error.response.data.message)
        } else {
          ToastMessages.showToastError('Algo deu errado, tente novamente!')
        }
      }
    }
  }

  return (
    <S.SwitchContainer>
      <Switch.Root
        checked={isPaid}
        onCheckedChange={(checked: boolean) =>
          updateCheckedParcel(parcelId, checked)
        }
        className="SwitchRoot"
      >
        <Switch.Thumb className="SwitchThumb" asChild>
          <CheckCircle size={18} />
        </Switch.Thumb>
      </Switch.Root>
    </S.SwitchContainer>
  )
}
