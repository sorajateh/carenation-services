<script setup>

const selected = ref(1)
const imgLoaded = ref(false)
const isOpen = ref(false)
const cards = [
    {
        key: 1
    },
    {
        key: 2
    },
    {
        key: 3
    }
]

function openModal(key) {
    isOpen.value = true
    selected.value = key
}

function closeModal() {
    isOpen.value = false
}

async function submit(selected) {
    sessionStorage.setItem("carenation-invitation-card", JSON.stringify({ selectedCard: selected }));
    navigateTo('/invitation-card/edit')
}

watch(isOpen, (newValue) => {
    if (!newValue) {
        imgLoaded.value = false
    }
})
</script>

<template>
    <div class="card-selector py-7">
        <div class="border-b border-grayscale-300 pb-4 lg:pb-10">
            <h3 class="text-lg lg:text-2xl text-primary">เลือกรูปแบบการ์ดเชิญ</h3>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-10 py-7 lg:py-10">
            <div v-for="card in cards" :key="card.key" class="cursor-pointer transition-transform origin-bottom duration-300 ease-out hover:-translate-y-2" @click="openModal(card.key)">
                <img class="mx-auto" :src="`/img/card-${card.key}.jpg`" />
            </div>
        </div>

       <UModal v-model="isOpen">
            <div v-show="imgLoaded" class="p-4 flex flex-col gap-y-7">
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-white cursor-pointer" @click="closeModal()">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="mx-auto">
                    <img class="scale-90 md:scale-100" :src="`/img/card-${selected}.jpg`" @load="imgLoaded = true"/>
                </div>
                <!-- <img class="mx-auto h-72 sm:h-[480px] md:h-auto min-h-72 max-h-[50vh]" :src="`/img/card-${selected}.png`" /> -->
                <div class="text-center">
                    <ButtonSecondary label="สร้างการ์ดเชิญโดยใช้รูปแบบนี้" size="large" noIcon @click="submit(selected)" />
                    <div class="text-[13px] text-ivory-700 text-center mt-4">ฟรี ไม่มีค่าใช้จ่าย</div>
                </div>
            </div>
        </UModal>

    </div>
</template>