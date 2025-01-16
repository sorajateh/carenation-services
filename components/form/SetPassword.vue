<script lang="ts" setup>
import type { FormSubmitEvent, FormError } from '#ui/types'

const props = defineProps({
  email: String
})

const result = ref({})
const timeOut = ref(false)
const emit = defineEmits()

const state = reactive({
  code: undefined,
  password: undefined
})

const startLoading = () => {
  emit('loading', true)
}
const stopLoading = () => {
  emit('loading', false)
}
const isTimeOut = (event: boolean) => {
  timeOut.value = event
}
const getPassword = (password: any) => {
  state.password = password
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.code) errors.push({ path: 'code', message: 'จำเป็น' })
  if (!state.password?.value) errors.push({ path: 'password', message: 'จำเป็น' })
  if (!state.password?.validate) errors.push({ path: 'password', message: 'รหัสผ่านไม่แข็งแรง' })
  return errors
}

const hasError = computed(() => validate(state).length ? true : false )

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
    startLoading()
    const response = await $fetch('/api/set-password', {
      method: 'post',
      body: {
        email: props.email,
        password: event.data.password.value,
        code: event.data.code,
      }
    })
    result.value = { response }
    stopLoading()
    emit( 'activeForm', 'login' )
  } catch (error: any) {
    result.value = { error }
    stopLoading()
  }
}

watch(timeOut, (newValue) => {
  if (newValue) {
    startLoading()
    setTimeout(() => {
      emit('activeForm', 'login')
      stopLoading()
    }, 1000);
  }
})

</script>

<template>
  <div>
    <div class="space-y-2 mb-6">
      <h3 class="font-noto font-medium text-3xl">รหัสผ่านใหม่</h3>
      <div>กรุณาตั้งรหัสผ่านใหม่สำหรับ {{ email }} ภายใน</div>
      <CountdownTimer @timeOut="isTimeOut" />
    </div>

    <UForm :state="state" :validate="validate" class="space-y-4" @submit="onSubmit">

      <UFormGroup name="code">
        <UInput size="lg" icon="ic-round-password" v-model="state.code" type="text" placeholder="Reset code" />
      </UFormGroup>
      
      <UFormGroup name="password">
        <InputPassword @inputChange="getPassword" />
      </UFormGroup>

      <div class="flex items-center justify-between">
        <div>
          
        </div>
        <div>
          <UButton type="submit" size="xl" :disabled="hasError">
            <span class="font-semibold">ตั้งรหัสใหม่</span>
          </UButton>
        </div>
      </div>
      
    </UForm>
    
    <div class="mt-3 text-sm text-red-500">
      <span v-if="result.error">Reset code ไม่ถูกต้อง</span>
    </div>

  </div>
</template>