import * as S from './styles'
import { Flag, Plus } from 'phosphor-react'
import { NewPlanningModal } from '../NewPlanningModal'
import { DialogButton } from '../../../../components/DialogButton'

export function NoPlanningOfMonth() {
  return (
    <S.NoPlanningOfMonth>
      <Flag size={80} />
      <span>Nenhum orçamento definido para este mês</span>
      <DialogButton
        action={<NewPlanningModal />}
        icon={<Plus />}
        title="DEFINIR NOVO PLANEJAMENTO"
      />
    </S.NoPlanningOfMonth>
  )
}
