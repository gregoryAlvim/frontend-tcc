import * as S from './styles'
import { Objective } from '../../@types/mockes'
import { Summary } from '../../components/Summary'
import * as Progress from '@radix-ui/react-progress'
import { useContextSelector } from 'use-context-selector'
import { CurrencyDollar, RocketLaunch, Target, X } from 'phosphor-react'
import { ObjectiveContext } from '../../contexts/objectives/ObjectiveContext'
import { useObjectivesSummary } from '../../hooks/useObjectivesSummary'
import { dateStringFormatter, priceFormatter } from '../../utils/formatter'
import { useState } from 'react'

export function Objectives() {
  const summary = useObjectivesSummary()

  const objectives: Objective[] = useContextSelector(
    ObjectiveContext,
    (context) => {
      return context.objectives
    },
  )

  const cardsToSummary = [
    {
      title: 'Objetivos ativos',
      icon: <Target size={32} color="#00b37e" />,
      value: summary.ativos,
    },
    {
      title: 'Total realizado',
      icon: <CurrencyDollar size={32} color="#00b37e" />,
      value: priceFormatter.format(summary.realizado),
    },
    {
      title: 'Total previsto',
      icon: <RocketLaunch size={32} color="#8047F8" />,
      value: priceFormatter.format(summary.previsto),
    },
  ]

  function calculateTotalPaidAmount(objective: Objective) {
    const installmentsPaid = objective.parcels.filter(
      (parcel) => parcel.isPaid === true,
    )

    const totalPaidAmount: number = installmentsPaid.reduce(
      (accumulator, parcel) => accumulator + parcel.value,
      0,
    )

    return totalPaidAmount
  }

  function calculateTargetPercentage(objective: Objective) {
    const installmentsPaid = objective.parcels.filter(
      (parcel) => parcel.isPaid === true,
    )

    const totalPaidAmount: number = installmentsPaid.reduce(
      (accumulator, parcel) => accumulator + parcel.value,
      0,
    )

    const targetPercentage = Number(
      ((totalPaidAmount / objective.goal) * 100).toFixed(0),
    )

    return targetPercentage
  }

  return (
    <S.ObjectivesContainer>
      <S.ObjectivesHeader>
        <S.ObjectivesTitle>Objetivos</S.ObjectivesTitle>
      </S.ObjectivesHeader>

      <Summary cards={cardsToSummary} />

      <S.CardsContainer>
        {objectives.map((objective) => (
          <S.CardItem key={objective.id}>
            <S.CardContent>
              <S.CardSpan className="ObjectiveDescription">
                {objective.description}
              </S.CardSpan>
              <S.CardSpan className="ObjectiveDates">{`De ${dateStringFormatter(
                objective.createdAt,
              )} até ${dateStringFormatter(objective.date)}`}</S.CardSpan>
              <S.CardStrong>
                {calculateTargetPercentage(objective) + '%'}
              </S.CardStrong>
            </S.CardContent>

            <Progress.Root className="ProgressRoot" max={objective.goal}>
              <Progress.Indicator
                className="ProgressIndicator"
                style={{
                  transform: `translateX(-${
                    100 - calculateTargetPercentage(objective)
                  }%)`,
                }}
              />
              <span className="ProgressContent">
                {`${priceFormatter.format(
                  calculateTotalPaidAmount(objective),
                )} / ${priceFormatter.format(objective.goal)}`}
              </span>
            </Progress.Root>

            <S.CardActions>
              <S.deleteItemButton onClick={() => console.log('click')}>
                <X />
              </S.deleteItemButton>
            </S.CardActions>
          </S.CardItem>
        ))}
      </S.CardsContainer>
    </S.ObjectivesContainer>
  )
}
