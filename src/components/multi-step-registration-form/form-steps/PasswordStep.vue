<script setup>
import InputField from '../../form-inputs/InputField.vue'
import { useFormValidation } from '../../../composables/useFormFields'

const props = defineProps({ 
  formData: Object,
  hideTitle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:formData'])

const {
  validate,
  getFieldError
} = useFormValidation(props.formData)

defineExpose({
  validate: () => validate(['password'])
})
</script>

<template>
  <h2 v-if="!hideTitle" class="password-form__title">Senha de acesso</h2>

  <form @submit.prevent="validate" novalidate>
    <InputField
      label="Sua senha"
      v-model="formData.password.value"
      :error="getFieldError('password')"
    />
  </form>
</template>

<style scoped>
.password-form__title {
  text-align: left;
}
</style>