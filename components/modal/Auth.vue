<script lang="ts" setup>
const { isAuthModal } = useLoginModal()

const loading = ref(false)
const activeForm = ref('login')
const requestEmail = ref('')

function openModal() {
  isAuthModal.value = true
}
function closeModal() {
  loading.value = true
  setTimeout(() => {
    activeForm.value = 'login'
    loading.value = false
  }, 1000);
  isAuthModal.value = false
}

const isLoading = (event: boolean) => {
  loading.value = event
}
const formHandle = (value: string) => {
  activeForm.value = value
}
const emailHandle = (email: string) => {
  requestEmail.value = email
}
</script>

<template>
  <div>
    <UModal v-model="isAuthModal">
      <div v-show="loading" :aria-hidden="!loading" class="size-full flex justify-center items-center absolute top-0 left-0 z-50 bg-white/50">
        <svg role="status" class="w-7 h-7 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-grayscale-400" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
          <path class="fill-primary-700" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
        </svg>
      </div>
      <UCard class="min-w-[336px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 fill-white cursor-pointer absolute -top-9 right-0" @click="closeModal()">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
        <div class="space-y-8">
          <FormLogin v-if="activeForm === 'login'" @loading="isLoading" @activeForm="formHandle" />
          <FormRegister v-if="activeForm === 'register'" @loading="isLoading" @activeForm="formHandle" />
          <FormResetPassword v-if="activeForm === 'reset-password'" @loading="isLoading" @activeForm="formHandle" @requestEmail="emailHandle" />
          <FormSetPassword v-if="activeForm === 'set-password'" @loading="isLoading" @activeForm="formHandle" :email="requestEmail" />
          <div v-if="activeForm === 'login' || activeForm === 'register'" class="space-y-7">
            <div class="flex items-center">
              <hr class="grow" />
              <div class="flex-none px-3">
                <span class="font-medium text-sm text-gray-400">หรือ</span>
              </div>
              <hr class="grow" />
            </div>
            <div>
              <nav class="space-y-4">
                <a href="/auth/google" class="flex justify-center items-center gap-x-4 w-72 h-10 border border-grayscale-400 rounded-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                  <div>ลงชื่อเข้าใช้ด้วย <span class="font-semibold">Google</span></div>
                </a>
                <a href="/auth/facebook" class="flex justify-center items-center gap-x-4 w-72 h-10 border border-[#1877F2] bg-[#1877F2] rounded-md mx-auto">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0H2C0.895 0 0 0.895 0 2V16C0 17.105 0.895 18 2 18H9.621V11.039H7.278V8.314H9.621V6.309C9.621 3.985 11.042 2.718 13.116 2.718C13.815 2.716 14.513 2.752 15.208 2.823V5.253H13.78C12.65 5.253 12.43 5.787 12.43 6.575V8.31H15.13L14.779 11.035H12.414V18H16C17.105 18 18 17.105 18 16V2C18 0.895 17.105 0 16 0Z" fill="white"/>
                  </svg>
                  <div class="text-white">ลงชื่อเข้าใช้ด้วย <span class="font-semibold">Facebook</span></div>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>