<script lang="ts" setup>
import type { FormSubmitEvent, FormError } from '#ui/types'

const result = ref({})
const emit = defineEmits()

const state = reactive({
  email: undefined
})

const startLoading = () => {
  emit('loading', true)
}
const stopLoading = () => {
  emit('loading', false)
}
const getEmail = (email: any) => {
  state.email = email
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email?.value) errors.push({ path: 'email', message: 'จำเป็น' })
  if (!state.email?.validate) errors.push({ path: 'email', message: 'อีเมลไม่ถูกต้อง' })
  return errors
}

const hasError = computed(() => validate(state).length ? true : false )

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
    startLoading()
    const response = await $fetch('/api/reset-password', {
      method: 'post',
      body: {
        email: event.data.email.value
      }
    })
    result.value = { response }
    emit('requestEmail', event.data.email.value)
    emit('activeForm', 'set-password')
    stopLoading()
  } catch (error) {
    stopLoading()
    result.value = { error }
  }
}

</script>

<template>
  <div>
    <div class="space-y-2 mb-6">
      <h3 class="font-noto font-medium text-3xl">ลืมรหัสผ่าน</h3>
      <div>กรุณากรอกอีเมลเพื่อรับรหัสสำหรับตั้งรหัสผ่านใหม่ หรือ <button class="font-semibold text-navy-800 underline" @click="emit('activeForm', 'login')">เข้าสู่ระบบ</button></div>
    </div>

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      
      <UFormGroup name="email">
        <InputEmail @inputChange="getEmail" />
      </UFormGroup>

      <div class="flex items-center justify-between">
        <div>
          <!-- {{ result }} -->
        </div>
        <div>
          <UButton type="submit" size="xl" :disabled="hasError">
            <span class="font-semibold">รับรหัสผ่าน</span>
          </UButton>
        </div>
      </div>
      
    </UForm>
    
    <div class="mt-3 text-sm text-red-500">
      <span v-if="result.error">ไม่พบบัญชีนี้</span>
      <!-- <span v-if="result.response?.data.status === 200">ส่ง Reset Password Code ไปทางอีเมลแล้ว</span> -->
    </div>

  </div>
</template>