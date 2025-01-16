<script setup>

const emit = defineEmits()

const totalTime = 60 * 15 // 15 minutes in seconds
const timeLeft = ref(totalTime)

const minutes = computed(() => Math.floor(timeLeft.value / 60).toString().padStart(2, '0'))
const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'))

let interval

onMounted(() => {
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      emit('timeOut', true)
      clearInterval(interval)
    }
  }, 1000)
})

onUnmounted(() => {
  // clearInterval(interval)
})
</script>

<template>
  <div>
    <h1>{{ minutes }}:{{ seconds }}</h1>
  </div>
</template>
