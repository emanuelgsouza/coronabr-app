export const MONTHS_ABBREV = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Nov',
  'Dez'
]

export const formatToMonth = (date) => {
  if (date) {
    const [, month, day] = date.split('-')
    const _month = MONTHS_ABBREV[Number(month)]

    return `${day} ${_month}`
  }

  return ''
}
