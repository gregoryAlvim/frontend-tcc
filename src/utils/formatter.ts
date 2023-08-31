import { parseISO, format } from 'date-fns'

export const dateStringFormatter = (date: string | undefined) => {
  if (date !== undefined) {
    const parsedDate = parseISO(date)
    const formattedDate = format(parsedDate, 'dd/MM/yyyy')

    return formattedDate
  }

  return 'Data incorreta'
}

export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
