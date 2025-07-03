<script setup>
const props = defineProps({
  modelValue: String,
  options: Array,
  name: String,
  error: String
})

const emit = defineEmits(['update:modelValue', 'change'])

function onChange(value) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="radio-group">
    <label v-for="opt in options" :key="opt.value">
      <input
        type="radio"
        :name="name"
        :value="opt.value"
        :checked="modelValue === opt.value"
        @change="onChange($event.target.value)"
      />
      {{ opt.label }}
    </label>
  </div>
  <span v-if="error" class="radio-group--error-message">{{ error }}</span>
</template>

<style scoped>
.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-group--error-message {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
