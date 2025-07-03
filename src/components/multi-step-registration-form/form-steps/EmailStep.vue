<script setup>
import InputField from '../../form-inputs/InputField.vue'
import RadioGroup from '../../form-inputs/RadioGroup.vue'
import { useFormValidation } from '../../../composables/useFormFields'

const props = defineProps({
  formData: Object,
  hideTitle: {
    type: Boolean,
    default: false
  },
  hideUserTypeSelection: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:formData'])

const userTypeOptions = [
  { value: 'PF', label: 'Pessoa física' },
  { value: 'PJ', label: 'Pessoa jurídica' }
]

const {
  validate,
  getFieldError,
  handleTouched
} = useFormValidation(props.formData)

defineExpose({
  validate: () => validate(['email', 'userType'])
})
</script>

<template>
  <h2 v-if="!hideTitle" class="email-form__title">Seja bem-vindo(a)</h2>

  <form @submit.prevent="validate" novalidate>
    <InputField
      label="Endereço de e-mail"
      v-model="formData.email.value"
      :error="getFieldError('email')"
      @touched="handleTouched('email')"
      type="email"
    />

    <RadioGroup
      v-if="!hideUserTypeSelection"
      name="userType"
      v-model="formData.userType.value"
      :options="userTypeOptions"
      :error="getFieldError('userType')"
    />
  </form>
</template>

<style scoped>
.email-form__title {
  text-align: left;
}
</style>
