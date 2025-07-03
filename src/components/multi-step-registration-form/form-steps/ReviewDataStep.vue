<script setup>
import { computed } from 'vue'
import { useFormValidation } from '../../../composables/useFormFields'

import EmailStep from './EmailStep.vue'
import PFDataStep from './PFDataStep.vue'
import PJDataStep from './PJDataStep.vue'
import PasswordStep from './PasswordStep.vue'

const props = defineProps({
  formData: Object
})

const { validate } = useFormValidation(props.formData)

const DEFAULT_FIELDS = ['email', 'password']
const PF_FIELDS = ['name', 'cpf', 'birthDate', 'phone']
const PJ_FIELDS = ['companyName', 'cnpj', 'companyOpeningDate', 'companyPhone']

const fieldsToValidate = computed(() => [
  ...DEFAULT_FIELDS,
  ...(props.formData.userType.value === 'PF' ? PF_FIELDS : PJ_FIELDS)
])

defineExpose({
  validate: () => validate(fieldsToValidate.value)
})
</script>

<template>
  <h2 class="review-data-form__title">Revise suas informações</h2>

  <div>
    <EmailStep
      :form-data="formData"
      hide-title
      hide-user-type-selection
    />

    <PFDataStep
      v-if="formData.userType.value === 'PF'"
      :form-data="formData"
      hide-title
    />

    <PJDataStep
      v-else
      :form-data="formData"
      hide-title
    />

    <PasswordStep
      :form-data="formData"
      hide-title
    />
  </div>
</template>

<style scoped>
.review-data-form__title {
  text-align: left;
}
</style>