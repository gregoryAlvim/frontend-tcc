import * as S from './styles'
import { SwitchParcel } from '../SwitchParcel'
import { Parcel } from '../../../../@types/mockes'
import { priceFormatter } from '../../../../utils/formatter'
import { getPortugueseMonth } from '../../../../utils/MothEnum'
import { ModalScreen } from '../../../../components/ModalScreen'

interface ParcelsModalProps {
  parcels: Parcel[]
}

export function ParcelsModal({ parcels }: ParcelsModalProps) {
  return (
    <ModalScreen title="Parcelas">
      <S.ParcelsContainer>
        <thead>
          <tr>
            <td>
              <strong>N°</strong>
            </td>
            <td>
              <strong>Valor</strong>
            </td>
            <td>
              <strong>Mês</strong>
            </td>
            <td>
              <strong>Foi paga</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {parcels &&
            parcels.map((parcel) => (
              <tr key={parcel.id}>
                <td>
                  <strong>{parcel.portion}</strong>
                </td>
                <td>
                  <span>{priceFormatter.format(parcel.value)}</span>
                </td>
                <td>
                  <span>{getPortugueseMonth(parcel.month)}</span>
                </td>
                <td>
                  <SwitchParcel parcelId={parcel.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </S.ParcelsContainer>
    </ModalScreen>
  )
}
