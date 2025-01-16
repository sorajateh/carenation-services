<script lang="ts" setup>

const password = ref('')
const isShow = ref(false)
const validation = ref([
  {
    pass: false,
    msg: 'ความยาวอย่างน้อย 8 ตัวอักษร'
  },
  {
    pass: false,
    msg: 'มีอักษรภาษาอังกฤษตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก'
  },
  {
    pass: false,
    msg: 'ประกอบด้วยตัวเลข 0-9'
  },
])
const emit = defineEmits()

const validate = (password: string) => {

  const patternCase = /(?=.*[a-z])(?=.*[A-Z])/
  const patternNumber = /[0-9]/

  const hasMinLength = (input: string) => {
    return input !== undefined && input.length >= 8
  }

  validation.value[0].pass = hasMinLength(password)
  validation.value[1].pass = patternCase.test(password)
  validation.value[2].pass = patternNumber.test(password)

  return hasMinLength(password) && patternCase.test(password) && patternNumber.test(password)
}

function toggle() {
  isShow.value ? isShow.value = false : isShow.value = true;
}

function update() {
  emit( 'inputChange', { value: password.value, validate: validate(password.value) } )
}

</script>

<template>
  <div>
    <UButtonGroup size="lg" :ui="{ wrapper: { horizontal: 'flex'} }">
      <UInput icon="i-ic-baseline-vpn-key" v-model="password" :type="isShow ? `text` : `password`" placeholder="Password" class="grow" @change="update()" />
      <UButton :icon="isShow ? `i-ic-baseline-visibility-off` : `i-ic-baseline-visibility`" color="gray" :ui="{ icon: { base: 'text-grayscale-500' } }" @click="toggle()" />
    </UButtonGroup>
    <ul class="space-y-1 mt-3">
      <li v-for="(list, index) in validation" :key="index" class="flex items-center gap-x-2 text-navy-300">
        <svg v-if="!list.pass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-success-400">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm" :class="{'text-navy-700': list.pass}">{{ list.msg }}</span>
      </li>
    </ul>
  </div>
</template>

<style>

</style>