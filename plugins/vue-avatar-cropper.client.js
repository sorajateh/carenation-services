import AvatarCropper from 'vue-avatar-cropper'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AvatarCropper)
})