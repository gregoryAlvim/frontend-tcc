import 'swiper/css'
import * as S from './styles'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Planning } from '../../../../@types/mockes'

import { useContextSelector } from 'use-context-selector'

import { PlanningContext } from '../../../../contexts/plannings/PlanningContext'
import { SliderCard } from '../SliderCard'

register()

interface PlanningsSliderProps {
  selectedMonth: string
}

export function PlanningsSlider({ selectedMonth }: PlanningsSliderProps) {
  const [currentPlanning, setCurrentPlanning] = useState<Planning | null>(null)

  const plannings = useContextSelector(PlanningContext, (context) => {
    return context.plannings
  })

  function filterPlanningByMonth(month: string) {
    const result = plannings.filter((planning) => planning.month === month)
    if (result.length === 0) {
      setCurrentPlanning(null)
    }

    setCurrentPlanning(result[0])
  }

  useEffect(() => {
    filterPlanningByMonth(selectedMonth)
  })

  return (
    <S.SliderContainer>
      {currentPlanning ? (
        <Swiper slidesPerView={3}>
          {currentPlanning.planningsByCategory.map((planningByCategory) => (
            <SwiperSlide key={planningByCategory.id}>
              <SliderCard planningByCategory={planningByCategory} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <span>Nenhum planejamento mensal definido para o mês atual!</span>
      )}
    </S.SliderContainer>
  )
}
