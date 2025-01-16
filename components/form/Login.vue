<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const isPasswordShow = ref(false)
const disableSavePassword = ref(true)
const result = ref({})
const emit = defineEmits()

const state = reactive({
  username: undefined,
  password: undefined
})

const startLoading = () => {
  emit('loading', true)
}
const stopLoading = () => {
  emit('loading', false)
}

function togglePassword() {
  isPasswordShow.value ? isPasswordShow.value = false : isPasswordShow.value = true;
}
function toggleAutoSavePassword() {
  disableSavePassword.value ? disableSavePassword.value = false : disableSavePassword.value = true;
}

const requireFieldsFilled = computed(() => {
  return state.username != '' && state.username != undefined && state.password != '' && state.password != undefined
});

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
    startLoading()
    const response = await $fetch('/api/jwt-auth', {
      method: 'post',
      body: {
        username: event.data.username,
        password: event.data.password
      }
    })
    result.value = { response }
    // @ts-ignore
    if ( response.success ) {
      // @ts-ignore
      setLoginSession(response.data)
    } else {
      stopLoading()
    }
  } catch (error: any) {
    console.log(error.response?.status)
  }
}

async function requestResetPassword() {
  startLoading()
  const response = await $fetch('/api/reset-password', {
    method: 'post',
    body: {
      login: state.username,
      callback_url: window.location.href
    }
  })
  stopLoading()
  result.value = { response }
}

async function setLoginSession(data: any) {
  const response = await $fetch('/auth/email',{
    method: 'POST',
    body: {
      user: data
    }
  })
  reloadNuxtApp()
}

onMounted(() => {
  stopLoading()
})

</script>

<template>
  <div>
    <div class="space-y-2 mb-6">
      <h3 class="font-noto font-medium text-3xl">ลงชื่อเข้าใช้</h3>
      <div>หากยังไม่เป็นสมาชิก กรุณา <button class="font-semibold text-navy-800 underline" @click="emit('activeForm', 'register')">สมัครสมาชิก</button></div>
    </div>

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      
      <UFormGroup name="username">
        <!-- <UInput size="lg" icon="i-ic-round-mail" v-model="state.username" type="text" placeholder="Email หรือ Username" @focus="disableSavePassword = false" @blur="disableSavePassword = true" :readonly="disableSavePassword" autocomplete="off" /> -->
        <UInput size="lg" icon="i-ic-round-mail" v-model="state.username" type="text" placeholder="Email หรือ Username" />
      </UFormGroup>

      <UFormGroup name="password">
        <UButtonGroup size="lg" :ui="{ wrapper: { horizontal: 'flex'} }">
          <!-- <UInput icon="i-ic-baseline-vpn-key" v-model="state.password" :type="isPasswordShow ? `text` : `password`" placeholder="Password" class="grow" @focus="disableSavePassword = false" @blur="disableSavePassword = true" :readonly="disableSavePassword" autocomplete="off" /> -->
          <UInput icon="i-ic-baseline-vpn-key" v-model="state.password" :type="isPasswordShow ? `text` : `password`" placeholder="Password" class="grow" />
          <UButton :icon="isPasswordShow ? `i-ic-baseline-visibility-off` : `i-ic-baseline-visibility`" color="gray" :ui="{ icon: { base: 'text-grayscale-500' } }" @click="togglePassword()" />
        </UButtonGroup>
      </UFormGroup>

      <div class="flex items-center justify-between">
        <div>
          <!-- <button type="button" class="font-bold text-sm text-navy-800 underline disabled:text-grayscale-400" :disabled="!state.username" @click="requestResetPassword()">ลืมรหัสผ่าน</button> -->
          <button type="button" class="font-semibold text-sm text-navy-800 underline disabled:text-grayscale-400" @click="emit('activeForm', 'reset-password')">ลืมรหัสผ่าน</button>
        </div>
        <div>
          <UButton type="submit" size="xl" :disabled="!requireFieldsFilled">
            <span class="font-semibold">ลงชื่อเข้าใช้</span>
          </UButton>
        </div>
      </div>
    </UForm>
    
    <div class="mt-3 text-sm text-red-500">
      <span v-if="`${result.response?.code}`.includes('invalid_username')">ไม่พบบัญชีนี้</span>
      <span v-if="`${result.response?.code}`.includes('incorrect_password')">Password ไม่ถูกต้อง</span>
    </div>

  </div>
</template>