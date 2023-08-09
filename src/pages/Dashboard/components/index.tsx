import * as S from './styles'
import { useState, useEffect } from 'react'
import * as Progress from '@radix-ui/react-progress'
import * as Separator from '@radix-ui/react-separator'

export function MonthlyBalance() {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <S.MonthlyBalanceContainer>
      <S.MonthlyBalanceItem variant="amount">
        <span>Receitas</span>

        <Progress.Root className="ProgressRoot" value={progress}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
          <span className="ProgressContent">{progress}%</span>
        </Progress.Root>

        <strong>R$ 1.500,00</strong>
      </S.MonthlyBalanceItem>

      <S.MonthlyBalanceItem>
        <span>Despesas</span>

        <Progress.Root className="ProgressRoot" value={progress}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
          <span className="ProgressContent">{progress}%</span>
        </Progress.Root>

        <strong>R$ 500,00</strong>
      </S.MonthlyBalanceItem>

      <Separator.Root className="SeparatorRoot" />

      <S.MonthlyBalanceItem>
        <span>Balanço</span>

        <div></div>

        <strong className="lastStrong">R$ 1.000,00</strong>
      </S.MonthlyBalanceItem>
    </S.MonthlyBalanceContainer>
  )
}
