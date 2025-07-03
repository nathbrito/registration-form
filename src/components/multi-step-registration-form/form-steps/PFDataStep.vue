<script setup>
import InputField from '../../form-inputs/InputField.vue'
import { useFormValidation } from '../../../composables/useFormFields'
import { getMaxBirthDate } from '../../../utils/datePicker'

const props = defineProps({
  formData: Object,
  hideTitle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:formData'])

const maxBirthDate = getMaxBirthDate()

const {
  validate,
  getFieldError,
  handleTouched
} = useFormValidation(props.formData)

defineExpose({
  validate: () => validate(['name', 'cpf', 'birthDate', 'phone'])
})
</script>

<template>
  <h2 v-if="!hideTitle" class="pf-form__title">Pessoa Física</h2>

  <form
    class="pf-form__fields"
    @submit.prevent="validate"
    novalidate
  >
    <InputField
      label="Nome"
      v-model="formData.name.value"
      :error="getFieldError('name')"
      @touched="handleTouched('name')"
    />

    <InputField
      label="CPF"
      v-model="formData.cpf.value"
      :error="getFieldError('cpf')"
      @touched="handleTouched('cpf')"
      type="text"
      maxlength="14"
    />

    <InputField
      label="Data de nascimento"
      v-model="formData.birthDate.value"
      :error="getFieldError('birthDate')"
      @touched="handleTouched('birthDate')"
      type="date"
      :max="maxBirthDate"
    />

    <InputField
      label="Telefone"
      v-model="formData.phone.value"
      :error="getFieldError('phone')"
      @touched="handleTouched('phone')"
      type="tel"
      maxlength="15"
    />
  </form>
</template>

<style scoped>
.pf-form__title {
  text-align: left;
}

.pf-form__fields {
  display: flex;
  flex-direction: column;
}
</style>