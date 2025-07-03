<script setup>
defineProps({
  open: Boolean,
  title: String,
  message: String,
  enableRetry: Boolean
})

const emit = defineEmits(['close', 'retry'])

function onClose() {
  emit('close')
}

function onRetry() {
  emit('retry')
}
</script>

<template>
  <div v-if="open" class="modal">
    <div class="modal__content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal__actions">
        <button v-if="enableRetry" class="button--primary" type="button" @click="onRetry">Tentar novamente</button>
        <button class="button--secondary" type="button" @click="onClose">Fechar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  background: var(--color-bg-base);
  padding: 32px;
  border-radius: var(--radius);
  max-width: 400px;
  text-align: center;
}

@media (max-width: 1023px) {
  .modal__content {
    max-width: 70vw;
  }
}

.modal__actions {
  display: flex;
  margin-top: 20px;
  gap: 12px;
  justify-content: center;
}
</style>
