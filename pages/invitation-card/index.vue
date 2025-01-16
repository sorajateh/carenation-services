<script setup lang="ts">
const { loggedIn } = useUserSession()
const { isAuthModal, toggleAuthModal } = useLoginModal()
const route = useRoute();
const router = useRouter()
const isOpen = ref(false)
useSeoMeta({
  title: 'สร้างการ์ดเชิญงานศพ',
})
</script>

<template>
    <div>
        <section>
            <div v-if="!loggedIn" class="container mx-auto">
                <PageHeading title="สร้างการ์ดเชิญงานศพ" />
                <div class="p-5 bg-white flex xs:inline-flex flex-col xs:flex-row items-start xs:items-center gap-4 rounded-xl">
                    <div>
                        ลงชื่อเข้าใช้เพื่อดูการ์ดเชิญที่เคยสร้างไว้
                    </div>
                    <div>
                        <ButtonSecondary label="เข้าสู่ระบบ / สมัครสมาชิก" @click="toggleAuthModal" />
                        <!-- <ModalAuth :isOpen="isAuthModal" /> -->
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container mx-auto">
                <CardSelector />
            </div>
        </section>
    </div>
</template>