import { reactive } from 'vue'

export function useRegistrationForm() {
  const formData = reactive({
    email: { value: '', valid: true, error: '', touched: false },
    userType: { value: 'PF', valid: true, error: '', touched: false },
    name: { value: '', valid: true, error: '', touched: false },
    cpf: { value: '', valid: true, error: '', touched: false },
    birthDate: { value: '', valid: true, error: '', touched: false },
    phone: { value: '', valid: true, error: '', touched: false },
    companyName: { value: '', valid: true, error: '', touched: false },
    cnpj: { value: '', valid: true, error: '', touched: false },
    companyOpeningDate: { value: '', valid: true, error: '', touched: false },
    companyPhone: { value: '', valid: true, error: '', touched: false },
    password: { value: '', valid: true, error: '', touched: false }
  })
  
  function resetForm() {
    for (const key in formData) {
      formData[key].value = ''
      formData[key].valid = true
      formData[key].error = ''
      formData[key].touched = false
    }

    formData.userType.value = 'PF'
  }

  return { 
    formData, 
    resetForm 
  }
}
