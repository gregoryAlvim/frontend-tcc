import * as S from './styles'
import { ModalScreen } from '../ModalScreen'
import { DefaultButton } from '../DefaultButton'
import { simulateEscapeKey } from '../../utils/simulateEscapeKey'

interface DeleteItemModalProps {
  action: () => void
}

export function DeleteItemModal({ action }: DeleteItemModalProps) {
  return (
    <ModalScreen title="Excluir item">
      <S.ContentContainer>
        <span>Você realmente deseja excluir esse item?</span>

        <S.ButtonsContainer>
          <DefaultButton title="Cancelar" onClick={simulateEscapeKey} />

          <DefaultButton
            title="Excluir"
            onClick={action}
            className="DeleteButton"
          />
        </S.ButtonsContainer>
      </S.ContentContainer>
    </ModalScreen>
  )
}
