<script lang="ts" setup>
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'

const result = ref({})
const error = ref(false)

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined
})

const emit = defineEmits()
const startLoading = () => {
  emit('loading', true)
}
const stopLoading = () => {
  emit('loading', false)
}
const getPassword = (password: any) => {
  state.password = password
}
const getEmail = (email: any) => {
  state.email = email
}

const validateUsername = (username: string) => {
  const pattern = /^[a-z0-9]+$/
  return pattern.test(username)
}
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'จำเป็น' })
  if (!validateUsername(state.username)) errors.push({ path: 'username', message: 'รูปแบบไม่ถูกต้อง' })
  if (!state.email?.value) errors.push({ path: 'email', message: 'จำเป็น' })
  if (!state.email?.validate) errors.push({ path: 'email', message: 'อีเมลไม่ถูกต้อง' })
  if (!state.password?.value) errors.push({ path: 'password', message: 'จำเป็น' })
  if (!state.password?.validate) errors.push({ path: 'password', message: 'รหัสผ่านไม่แข็งแรง' })
  return errors
}

const hasError = computed(() => validate(state).length ? true : false )

async function onSubmit (event: FormSubmitEvent<any>) {
  startLoading()
  try {
    const register = await $fetch('/api/register', {
      method: 'post',
      body: {
        username: event.data.username,
        email: event.data.email.value,
        password: event.data.password.value
      }
    })
   if ( register ) {
    result.value = { register }
    const login = await $fetch('/api/jwt-auth', {
      method: 'post',
      body: {
        username: event.data.username,
        password: event.data.password.value
      }
    })
    // @ts-ignore
    if ( login.success ) {
      // @ts-ignore
      setLoginSession(login.data)
    }
   }
  } catch (err) {
    error.value = true
    stopLoading()
  }
}

async function onError (event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function setLoginSession(data: any) {
  await $fetch('/auth/email',{
    method: 'POST',
    body: {
      user: data,
      loggedInAt: new Date()
    }
  })
  reloadNuxtApp({force: true})
}

</script>

<template>
  <div>

    <div class="space-y-2 mb-6">
      <h3 class="font-noto font-medium text-3xl">สมัครสมาชิก</h3>
      <div>หากเป็นสมาชิกอยู่แล้ว กรุณา <button class="font-semibold text-navy-800 underline" @click="emit('activeForm', 'login')">เข้าสู่ระบบ</button></div>
    </div>

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">

      <UFormGroup name="username">
        <UInput size="lg" icon="i-ic-round-person" v-model="state.username" type="text" placeholder="Username" />
      </UFormGroup>

      <UFormGroup name="email">
        <InputEmail @inputChange="getEmail" />
      </UFormGroup>

      <UFormGroup name="password">
        <InputPassword @inputChange="getPassword" />
      </UFormGroup>

      <div class="flex justify-between">
        <div>
          
        </div>
        <div>
          <UButton type="submit" size="xl" :disabled="hasError">
            <span class="font-semibold">สมัครสมาชิก</span>
          </UButton>
        </div>
      </div>

      <div class="mt-3 text-sm text-red-500">
        <span v-if="error">เกิดข้อผิดพลาด</span>
      </div>

    </UForm>

  </div>
</template>