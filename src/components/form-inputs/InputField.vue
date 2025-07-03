<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  error: String,
  type: { type: String, default: 'text' },
  maxlength: String,
  max: String
})

const emit = defineEmits(['update:modelValue', 'touched'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
  emit('touched')
}
</script>

<template>
  <label class="input__label">
    {{ label }}
    <input
      class="input--default"
      :type="type"
      :value="modelValue"
      :maxlength="maxlength"
      :max="max"
      @input="onInput"
    />
    <span v-if="error" class="input__error-message">{{ error }}</span>
  </label>
</template>

<style scoped>
.input__label {
  text-align: left;
  display: flex;
  flex-direction: column;
}
.input--default {
  height: 32px;
  border-radius: var(--radius);
  border-width: thin;
}

.input__error-message {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
