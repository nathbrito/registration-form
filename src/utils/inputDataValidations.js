export function isFilled(value) {
  return !!(typeof value === 'string' ? value.trim() : value)
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidName(name) {
  const trimmedName = name.trim()

  if (trimmedName.length < 2) return false

  if (!/^[A-Za-zÀ-ÿ'’-]+(?: [A-Za-zÀ-ÿ'’-]+)*$/.test(trimmedName)) return false

  if (/^(.)\1+$/.test(trimmedName.replace(/ /g, ''))) return false

  return true
}

export function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

  let sumFirstCheckDigit = 0
  for (let i = 0; i < 9; i++) sumFirstCheckDigit += parseInt(cpf.charAt(i)) * (10 - i)
  let firstCheckDigit = 11 - (sumFirstCheckDigit % 11)
  firstCheckDigit = firstCheckDigit >= 10 ? 0 : firstCheckDigit

  let sumSecondCheckDigit = 0
  for (let i = 0; i < 10; i++) sumSecondCheckDigit += parseInt(cpf.charAt(i)) * (11 - i)
  let secondCheckDigit = 11 - (sumSecondCheckDigit % 11)
  secondCheckDigit = secondCheckDigit >= 10 ? 0 : secondCheckDigit

  return firstCheckDigit === parseInt(cpf.charAt(9)) && secondCheckDigit === parseInt(cpf.charAt(10))
}

export function isValidCompanyName(companyName) {
  const trimmedCompanyName = companyName.trim()

  if (!/^[A-Za-zÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç0-9 .,–-]+$/.test(trimmedCompanyName)) {
    return false
  }

  if (trimmedCompanyName.length < 2) return false

  if (/^(.)\1+$/.test(trimmedCompanyName.replace(/ /g, ''))) return false

  return true
}

export function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '')
  return !(cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj))
}

export function isValidDate(dateStr) {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

export function isDateBeforeOrEqualToday(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()

  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return date <= today
}

export function isDateMoreThan18YearsAgo(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()
  
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  const dayDiff = today.getDate() - date.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }

  return age >= 18
}

export function isValidBrazilianPhone(phone) {
  return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(phone)
}
