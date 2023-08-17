import * as S from './styles'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'

interface CardProps {
  title: string
  icon: React.ReactNode
  value: number
}

interface SummaryProps {
  cards: CardProps[]
}

export function Summary({ cards }: SummaryProps) {
  const summary = useSummary()

  return (
    <S.SummaryContainer>
      {cards.map((card) => (
        <S.SummaryCard key={card.title}>
          <header>
            <span>{card.title}</span>

            {card.icon}
          </header>

          <strong>{priceFormatter.format(card.value)}</strong>
        </S.SummaryCard>
      ))}
    </S.SummaryContainer>
  )
}
