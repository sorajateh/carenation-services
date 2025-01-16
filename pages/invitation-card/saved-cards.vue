<script setup>
const config = useRuntimeConfig()
const { loggedIn, user } = useUserSession()

useSeoMeta({
  title: 'การ์ดเชิญงานศพที่บันทึก'
})

const router = useRouter()
const userId = ref(0)
// const cards = ref([
//     {
//         id: '28dx2KJT',
//         imgUrl: '/img/card-1.png'
//     },
//     {
//         id: 'm8nncReb',
//         imgUrl: '/img/card-2.png'
//     },
//     {
//         id: 'gD9MtJW7',
//         imgUrl: '/img/card-3.png'
//     }
// ])
const cards = ref([])

cards.value = await $fetch(`${config.public.apiBase}/invitation-card/v1/user/${user.value.id}`)

const processing = ref(false)
const isShareModalOpen = ref(false)
const isRemoveModalOpen = ref(false)
const shareUrl = ref(null)
const removeCardId = ref(null)

function openShareModal(url) {
    isShareModalOpen.value = true
    shareUrl.value = url
}
function openRemoveModal(id) {
    isRemoveModalOpen.value = true
    removeCardId.value = id
}

function downloadFile(cardId, dataUrl) {
    let link = document.createElement('a');
    link.download = `Carenation-Invitation-Card-${cardId}.jpg`;
    link.href = dataUrl;
    link.click();
}

async function removeCard(cardId) {
    processing.value = true
    const response = await $fetch(`/api/card/${removeCardId.value}`, {
        method: 'DELETE',
    })
    isRemoveModalOpen.value = false
    reloadNuxtApp({force: true})
}


onBeforeMount(() => {
//   if (loggedIn.value) {
//     isLoggedIn.value = true
//     userId.value = loggedIn.value.userId
//   } else {
//     isLoggedIn.value = false
//     router.push({ path: '/' })
//   }
})

</script>

<template>
    <div class="bg-grayscale-100">
        <section class="pb-10">
            <div class="container mx-auto">
                <PageHeading :title="`การ์ดเชิญงานศพ (` + cards.length + `)`" hasBottomBorder>
                    <ButtonPrimary :href="{ path: '/invitation-card', query: { compose: true } }" label="สร้างการ์ดเชิญใหม่" class="ml-7" />
                </PageHeading>
            </div>
        </section>
        <section class="pb-20">
            <div class="container mx-auto">
                <div v-if="cards.length" class="flex flex-wrap flex-col sm:flex-row items-center gap-12">
                    <div v-for="(card, index) in cards" :key="index" class="card  border-grayscale-200">
                        <div class="bg-white p-2.5 relative z-0 overflow-hidden">
                            <img class="object-contain object-center transition-transform origin-bottom duration-300 ease-out" width="219" height="310" :src="card.img_data" />
                        </div>
                        <div class="bg-primary-700/85 px-4 -mt-20 relative z-10">
                            <div class="text-white py-4">
                                <h6 class="font-medium text-[13px]">การ์ดเชิญงานสวดอภิธรรม</h6>
                                <h5 class="font-bold text-sm">{{ card.title }}</h5>
                            </div>
                            <ul class="button-list grid grid-cols-4 border-t-[0.5px] border-grayscale-300">
                                <li>
                                    <NuxtLink :to="`/invitation-card/edit/${card.id}`">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path class="b" d="M14.75,8.03l1.23,1.23L3.89,21.33h-1.23v-1.23l12.08-12.08ZM19.55,0c-.33,0-.68.13-.93.39l-2.44,2.44,5,5,2.44-2.44c.52-.52.52-1.36,0-1.88l-3.12-3.12c-.27-.27-.6-.39-.95-.39ZM14.75,4.25L0,19v5h5l14.75-14.75-5-5Z"/>
                                        </svg>
                                    </NuxtLink>
                                </li>
                                <li @click="openShareModal(card.url)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                                        <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
                                    </svg>
                                </li>
                                <li @click="downloadFile(card.id, card.img_data)"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 17" fill="currentColor" class="w-3.5 h-4">
                                        <path class="b" d="M14,6h-4V0h-6v6H0l7,7,7-7ZM6,8V2h2v6h1.17l-2.17,2.17-2.17-2.17h1.17ZM0,15h14v2H0v-2Z"/>
                                    </svg>
                                </li>
                                <li @click="openRemoveModal(card.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 28" fill="currentColor" class="w-[21px] h-[26px]">
                                        <path d="M8.3335 0.666016L7.00016 1.99935H0.333496V4.66602H4.3335H17.6668H21.6668V1.99935H15.0002L13.6668 0.666016H8.3335ZM1.66683 7.33268V24.666C1.66683 26.1327 2.86683 27.3327 4.3335 27.3327H17.6668C19.1335 27.3327 20.3335 26.1327 20.3335 24.666V7.33268H1.66683Z" fill="white"/>
                                    </svg>  
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col items-center py-14 gap-y-7">
                    <div>
                        <NuxtImg src="/svg/card-compose.svg" class="w-[134px] sm:w-[233px] h-[104px] sm:h-[181px]" />
                    </div>
                    <div class="font-medium text-lg text-grayscale-700">ยังไม่มีการ์ดเชิญ</div>
                    <div>
                        <ButtonPrimary label="สร้างการ์ดเชิญใหม่" :href="{ path: '/', query: { compose: true } }" size="large" />
                        <div class="text-[13px] text-navy-500 text-center mt-4">ฟรี ไม่มีค่าใช้จ่าย</div>
                    </div>
                </div>
            </div>
        </section>
        
        <ModalShare :isOpen="isShareModalOpen" @close="isShareModalOpen = false" :url="shareUrl" />

        <UModal v-model="isRemoveModalOpen">
            <div class="flex flex-col gap-y-2">
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-white cursor-pointer" @click="isRemoveModalOpen = false">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="text-center bg-white p-7">
                  <header class="pb-4">
                    <h4 class="font-medium text-2xl text-navy-700">ยืนยันการลบการ์ดเชิญ</h4>
                  </header>
                  <main>
                    <div class="space-x-3">
                      <ButtonSecondary label="ยกเลิก" size="medium" @click="isRemoveModalOpen = false"/>
                      <ButtonPrimary label="ยืนยัน" size="medium" @click="removeCard()" :loading="processing" />
                    </div>
                  </main>
                </div>
            </div>
        </UModal>
    </div>
</template>

<style scoped>
ul.button-list > li {
    @apply h-16 flex justify-center items-center cursor-pointer
}
ul.button-list > li svg {
    @apply fill-white
}
.card:hover img {
    @apply -translate-y-1
}
</style>