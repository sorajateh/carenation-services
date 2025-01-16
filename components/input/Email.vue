<script lang="ts" setup>

const email = ref('')
const emit = defineEmits()

const validate = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

function update() {
  emit( 'inputChange', { value: email.value, validate: validate(email.value) } )
}

</script>

<template>
  <div>
    <UInput size="lg" icon="i-ic-round-mail" v-model="email" type="email" placeholder="Email" @change="update" />
  </div>
</template>

<style>

</style>