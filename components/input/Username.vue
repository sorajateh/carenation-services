<script lang="ts" setup>

const username = ref('')
const emit = defineEmits()

const validate = (username: string) => {
  const pattern = /^[a-z0-9]+$/
  return pattern.test(username)
}

function update() {
  emit( 'inputChange', { value: username.value, validate: validate(username.value) } )
}

</script>

<template>
  <div>
    <UInput size="lg" icon="i-ic-round-person" v-model="username" type="text" placeholder="Username" @change="update" />
  </div>
</template>

<style>

</style>