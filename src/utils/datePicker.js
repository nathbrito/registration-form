function formatDateToISO(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function getTodayOrPast() {
  return formatDateToISO(new Date())
}

export function getMaxBirthDate() {
  const MINIMUM_AGE_TO_REGISTER = 18 // age of majority in Brazil

  const date = new Date()
  date.setFullYear(date.getFullYear() - MINIMUM_AGE_TO_REGISTER)
  return formatDateToISO(date)
}
