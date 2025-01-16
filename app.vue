<script setup>
provideHeadlessUseId(() => useId())
const route = useRoute()
const isAuthModal = useState('is-login-modal', () => false)
useHead({
  titleTemplate: `%s - Carenation Invitation Card`
})
</script>

<template>
  <div>
    <!-- <UContainer> -->
      <Header />
      <ModalAuth :isOpen="isAuthModal" />
      <NuxtPage class="pt-16 lg:pt-28" />
      <Footer />
    <!-- </UContainer> -->
    <UNotifications />
    <!-- <UModals /> -->
  </div>
</template>
