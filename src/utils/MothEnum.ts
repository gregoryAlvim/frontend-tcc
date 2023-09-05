export enum MonthEnum {
  January = 'Janeiro',
  February = 'Fevereiro',
  March = 'Março',
  April = 'Abril',
  May = 'Maio',
  June = 'Junho',
  July = 'Julho',
  August = 'Agosto',
  September = 'Setembro',
  October = 'Outubro',
  November = 'Novembro',
  December = 'Dezembro',
}

export function getPortugueseMonth(month: keyof typeof MonthEnum): string {
  return MonthEnum[month]
}
