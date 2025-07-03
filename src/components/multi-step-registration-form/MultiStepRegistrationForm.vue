<script setup>
import { ref, computed } from 'vue'
import FeedbackModal from '../feedback-modal/FeedbackModal.vue'
import EmailStep from './form-steps/EmailStep.vue'
import PasswordStep from './form-steps/PasswordStep.vue'
import PFDataStep from './form-steps/PFDataStep.vue'
import PJDataStep from './form-steps/PJDataStep.vue'
import ReviewDataStep from './form-steps/ReviewDataStep.vue'
import { useRegistrationForm } from '../../composables/useRegistrationForm'

const currentStepRef = ref(null)
const currentStep = ref(0)
const openFeedbackModal = ref(false)
const feedbackTitle = ref('')
const feedbackMessage = ref('')
const enableRetry = ref(false)

const {
  formData,
  resetForm
} = useRegistrationForm()

const steps = computed(() => [
  EmailStep,
  formData.userType.value === 'PF' ? PFDataStep : PJDataStep,
  PasswordStep,
  ReviewDataStep
])

const proceedButtonLabel = computed(
  () => (currentStep.value !== steps.value.length - 1 ? 'Continuar' : 'Cadastrar')
)

function goToPreviousStep() {
  currentStep.value--
}

function parseFormData() {
  return Object.fromEntries(
    Object.entries(formData)
      .filter(([_, field]) => field.value)
      .map(([key, field]) => [key, field.value])
  )
}

async function goToNextStep() {
  const component = currentStepRef.value

  if (typeof component?.validate === 'function') {
    const isStepValid = await component.validate()
    if (isStepValid) {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++
      } else {
        await submitForm()
      }
    }
  }
}

async function submitForm() {
  try {
    const payload = parseFormData()
    const response = await fetch('http://localhost:3000/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      setFeedbackModalType('INVALID_DATA')
    } else {
      setFeedbackModalType('SUCCESS')
    }
  } catch (error) {
    setFeedbackModalType('ERROR')
  } finally {
    openFeedbackModal.value = true
  }
}

function setFeedbackModalType(type) {
  const feedbackTypes = {
    'SUCCESS': {
      title: 'Cadastro realizado com sucesso!'
    },
    'INVALID_DATA': {
      title: 'Falha no cadastro',
      message: 'Revise os campos preenchidos',
      enableRetry: true
    },
    'ERROR': {
      title: 'Erro no cadastro',
      message: 'Tente novamente mais tarde'
    }
  }

  feedbackTitle.value = feedbackTypes[type].title || ''
  feedbackMessage.value = feedbackTypes[type].message || ''
  enableRetry.value = feedbackTypes[type].enableRetry || false
  openFeedbackModal.value = true
}

function closeModal() {
  resetForm()
  currentStep.value = 0
  openFeedbackModal.value = false
}

function handleRetry() {
  openFeedbackModal.value = false
}
</script>

<template>
  <div class="steps__counter">
    Etapa <span class="steps__counter--highlight">{{ currentStep + 1 }}</span> de {{ steps.length }}
  </div>

  <component
    :is="steps[currentStep]"
    ref="currentStepRef"
    :form-data="formData"
  />

  <div class="steps__navigation">
    <button
      v-if="currentStep !== 0"
      type="button"
      class="button--secondary"
      @click="goToPreviousStep"
    >
      Voltar
    </button>

    <button
      type="button"
      class="button--primary steps__navigation--button-proceed"
      @click="goToNextStep"
    >
      {{ proceedButtonLabel }}
    </button>
  </div>

  <FeedbackModal
    :open="openFeedbackModal"
    :title="feedbackTitle"
    :message="feedbackMessage"
    :enable-retry="enableRetry"
    @close="closeModal"
    @retry="handleRetry"
  />
</template>

<style scoped>
.steps__counter {
  text-align: left;
}

.steps__counter--highlight {
  color: var(--color-primary);
}

.steps__navigation {
  display: flex;
  column-gap: 16px;
  margin-top: 18px;
}

.steps__navigation--button-proceed {
  width: 100%;
}
</style>
