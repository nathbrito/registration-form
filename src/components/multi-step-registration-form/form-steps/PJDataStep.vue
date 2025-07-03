<script setup>
import InputField from '../../form-inputs/InputField.vue'
import { useFormValidation } from '../../../composables/useFormFields'
import { getTodayOrPast } from '../../../utils/datePicker'

const props = defineProps({
  formData: Object,
  hideTitle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:formData'])

const maxDate = getTodayOrPast()

const {
  validate,
  getFieldError,
  handleTouched
} = useFormValidation(props.formData)

defineExpose({
  validate: () => validate(['companyName', 'cnpj', 'companyOpeningDate', 'companyPhone'])
})
</script>

<template>
  <h2 v-if="!hideTitle" class="pj-form__title">Pessoa Jurídica</h2>

  <form
    class="pj-form__fields"
    @submit.prevent="validate"
    novalidate
  >
    <InputField
      label="Razão social"
      v-model="formData.companyName.value"
      :error="getFieldError('companyName')"
      @touched="handleTouched('companyName')"
    />

    <InputField
      label="CNPJ"
      v-model="formData.cnpj.value"
      :error="getFieldError('cnpj')"
      @touched="handleTouched('cnpj')"
      type="text"
      maxlength="18"
    />

    <InputField
      label="Data de abertura"
      v-model="formData.companyOpeningDate.value"
      :error="getFieldError('companyOpeningDate')"
      @touched="handleTouched('companyOpeningDate')"
      type="date"
      :max="maxDate"
    />

    <InputField
      label="Telefone"
      v-model="formData.companyPhone.value"
      :error="getFieldError('companyPhone')"
      @touched="handleTouched('companyPhone')"
      type="tel"
      maxlength="15"
    />
  </form>
</template>

<style scoped>
.pj-form__title {
  text-align: left;
}

.pj-form__fields {
  display: flex;
  flex-direction: column;
}
</style>