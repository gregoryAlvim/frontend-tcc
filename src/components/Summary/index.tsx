import * as S from './styles'

interface CardProps {
  title: string
  icon: React.ReactNode
  value: number | string
}

interface SummaryProps {
  cards: CardProps[]
}

export function Summary({ cards }: SummaryProps) {
  return (
    <S.SummaryContainer>
      {cards.map((card) => (
        <S.SummaryCard key={card.title}>
          <header>
            <span>{card.title}</span>

            {card.icon}
          </header>

          <strong>{card.value}</strong>
        </S.SummaryCard>
      ))}
    </S.SummaryContainer>
  )
}
