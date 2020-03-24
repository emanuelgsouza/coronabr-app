
export const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export const MONTHS_ABBREV = MONTHS.map(month => month.slice(0, 3))

export const formatToMonth = (date) => {
  if (date) {
    const [, month, day] = date.split('-')
    const _month = MONTHS_ABBREV[Number(month) - 1]

    return `${day} ${_month}`
  }

  return ''
}
