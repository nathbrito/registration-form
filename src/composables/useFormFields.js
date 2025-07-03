import { 
  isFilled, 
  isValidEmail,
  isValidCPF, 
  isValidDate,
  isValidName,
  isDateMoreThan18YearsAgo,
  isValidCNPJ,
  isValidCompanyName,
  isValidBrazilianPhone, 
  isDateBeforeOrEqualToday
} from '../utils/inputDataValidations'

export function useFormValidation(formData) {
  const validators = {
    email: [
      { validate: value => isFilled(value), error: 'E-mail é obrigatório.' },
      { validate: value => isValidEmail(value), error: 'E-mail inválido.' },
    ],
    userType: [
      { validate: value => isFilled(value), error: 'Tipo de cadastro é obrigatório.' },
    ],
    name: [
      { validate: value => isFilled(value), error: 'Nome é obrigatório.' },
      { validate: value => isValidName(value), error: 'Nome inválido.' },
    ],
    cpf: [
      { validate: value => isFilled(value), error: 'CPF é obrigatório.' },
      { validate: value => isValidCPF(value), error: 'CPF inválido.' }
    ],
    birthDate: [
      { validate: value => isFilled(value), error: 'Data de nascimento é obrigatória.' },
      { validate: value => isValidDate(value), error: 'Data de nascimento inválida.' },
      { validate: value => isDateMoreThan18YearsAgo(value), error: 'Data de nascimento deve ser superior a 18 anos.' }
    ],
    phone: [
      { validate: value => isFilled(value), error: 'Telefone é obrigatório.' },
      { validate: value => isValidBrazilianPhone(value), error: 'Telefone inválido.' }
    ],
    companyName: [
      { validate: value => isFilled(value), error: 'Razão social é obrigatória.' },
      { validate: value => isValidCompanyName(value), error: 'Razão social inválida.' }
    ],
    cnpj: [
      { validate: value => isFilled(value), error: 'CNPJ é obrigatório.' },
      { validate: value => isValidCNPJ(value), error: 'CNPJ inválido.' }
    ],
    companyOpeningDate: [
      { validate: value => isFilled(value), error: 'Data de abertura é obrigatória.' },
      { validate: value => isValidDate(value), error: 'Data de abertura inválida.' },
      { validate: value => isDateBeforeOrEqualToday(value), error: 'Data de abertura inválida.' }
    ],
    companyPhone: [
      { validate: value => isFilled(value), error: 'Telefone é obrigatório.' },
      { validate: value => isValidBrazilianPhone(value), error: 'Telefone inválido.' }
    ],
    password: [
      { validate: value => isFilled(value), error: 'Senha é obrigatório.' },
    ]
  }

  function validateField(field) {
    formData[field].touched = true
    const rawValue = formData[field].value
    const fieldValidators = validators[field] || []

    for (const { validate, error } of fieldValidators) {
      if (!validate(rawValue)) {
        formData[field].valid = false
        formData[field].error = error
        return false
      }
    }

    formData[field].valid = true
    formData[field].error = ''
    return true
  }

  function validate(fields = null) {
    let allValid = true
    const keys = fields || Object.keys(formData)

    for (const key of keys) {
      if (!validateField(key)) allValid = false
    }

    return allValid
  }

  function getFieldError(field) {
    return !formData[field].valid && formData[field].touched ? formData[field].error : ''
  }

  function handleTouched(field) {
    if (formData[field].touched)
      validate([field])
  }

  return {
    validate,
    getFieldError,
    handleTouched
  }
}
