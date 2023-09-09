import { DialogButton } from '../../../../components/DialogButton'
import { NewTransactionModal } from '../../../Transactions/components/NewTransactionModal'
import * as S from './styles'
import { Flag, Plus } from 'phosphor-react'

export function NoPlanningOfMonth() {
  return (
    <S.NoPlanningOfMonth>
      <Flag size={80} />
      <span>Nenhum orçamento definido para este mês</span>
      <DialogButton
        action={<NewTransactionModal typeOfButton="income" />}
        icon={<Plus />}
        title="DEFINIR NOVO PLANEJAMENTO"
      />
    </S.NoPlanningOfMonth>
  )
}
