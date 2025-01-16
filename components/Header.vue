<script setup>
const { loggedIn, user } = useUserSession()
const { isAuthModal, toggleAuthModal } = useLoginModal()

const menus = ref(
    {
        "สินค้าและบริการ": {
            href: "",
            childs: [
                {
                    label: "พวงหรีด",
                    href: "https://care-nation.com/product-category/wreath/"
                },
                {
                    label: "ของชำร่วยสานบุญ",
                    href: "https://care-nation.com/%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%8a%e0%b8%b3%e0%b8%a3%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b8%aa%e0%b8%b2%e0%b8%99%e0%b8%9a%e0%b8%b8%e0%b8%8d/"
                },
                {
                    label: "Charity Dinners",
                    href: "https://care-nation.com/10-charity-dinners-with-thought-leaders/"
                },
                {
                    label: "สร้างการ์ดเชิญงานศพ",
                    href: "/invitation-card"
                },
                {
                    label: "ขั้นตอนการจัดงานศพ",
                    href: "",
                    childs: [
                        {
                            label: "พิธีพุทธแบบไทย",
                            href: "/funeral-checklist/thai-buddhist"
                        },
                        {
                            label: "พิธีพุทธแบบจีน",
                            href: "/funeral-checklist/chinese-buddhist"
                        }
                    ]
                },
                {
                    label: "วิธีการสั่งซื้อ",
                    href: "https://care-nation.com/how-to-order/"
                },
                {
                    label: "แจ้งชำระเงิน",
                    href: "https://care-nation.com/confirm-payment/"
                }
            ]
        },
        "ชุมชน": {
            href: "https://care-nation.com/locality/"
        },
        "องค์กรที่เข้าร่วม": {
            href: "https://care-nation.com/co-foundation/"
        },
        "การทำงาน": {
            href: "https://care-nation.com/association/"
        },
        "เกี่ยวกับเรา": {
            href: "",
            childs: [
                {
                    label: "เกี่ยวกับเรา",
                    href: "https://care-nation.com/our-story/"
                },
                {
                    label: "คำถามที่พบบ่อย",
                    href: "https://care-nation.com/faqs/"
                },
                {
                    label: "ประวัติพวงหรีด",
                    href: "https://care-nation.com/%e0%b8%9b%e0%b8%a3%e0%b8%b0%e0%b8%a7%e0%b8%b1%e0%b8%95%e0%b8%b4%e0%b8%9e%e0%b8%a7%e0%b8%87%e0%b8%ab%e0%b8%a3%e0%b8%b5%e0%b8%94/"
                },
                {
                    label: "บทความ",
                    href: "https://care-nation.com/category/article/"
                },
                {
                    label: "อัลบั้มรูป",
                    href: "https://care-nation.com/gallery/"
                },
                {
                    label: "ติดต่อเรา",
                    href: "https://care-nation.com/contact/"
                }
            ]
        },
    }
)

const selectedSubmenu = ref(null)
const selectedSuperSubmenu = ref(null)
const isMobileMenuOpen = ref(false)
const mobileSelectedSubmenu = ref(null)
const contact = ref({
        tel: {
            label: "092-962-9524",
            href: "tel:+66929629524"
        },
        line: {
            label: "@Carenation",
            href: "https://lin.ee/zgZwZCo"
        }
    })


function openSubmenu(id) {
    selectedSubmenu.value = id
}
function closeSubmenu() {
    selectedSubmenu.value = null
}
function openSuperSubmenu(id) {
    selectedSuperSubmenu.value = id
}
function toggleMobileSubmenu(id) {
    if ( mobileSelectedSubmenu.value === null ) {
        mobileSelectedSubmenu.value = id
    } else {
        mobileSelectedSubmenu.value = null
    }
}
function closeMobileSubmenu() {
    mobileSelectedSubmenu.value = null
}
function toggleMobileMenu(isOpen) {
    isMobileMenuOpen.value = isOpen
    if ( !isOpen ) {
        mobileSelectedSubmenu.value = null
    }
}
async function requestLogOut() {
    const response = await $fetch('/auth/logout')
    reloadNuxtApp({force: true})
}

</script>

<template>
    <header class="shadow-xl fixed w-full z-[60] bg-white">
        <div id="header-top" class="bg-gray-200 hidden lg:block">
            <div class="container mx-auto flex py-0.5 justify-end">
                <nav class="flex items-center gap-x-7 py-1 text-lg">
                    <a :href="contact.tel.href" class="flex items-center gap-x-1">
                        <SvgPhone class="w-5 h-5" />
                        <span class="font-medium text-grayscale-700">{{ contact.tel.label }}</span>
                    </a> 
                    <a :href="contact.line.href" class="flex items-center gap-x-1">
                        <SvgLine class="w-6 h-6" />
                        <span class="font-medium text-grayscale-700">{{ contact.line.label }}</span>
                    </a> 
                </nav>
            </div> 
        </div>
        <div id="header-bottom">
            <div class="container mx-auto h-16 lg:h-auto flex justify-between items-center">
                <a href="https://care-nation.com">
                    <SvgLogo class="w-44 lg:w-52 h-auto fill-primary-700 stroke-none" />
                </a>
                <div id="main-menu" class="hidden lg:block">
                    <ul class="flex gap-x-5 relative">
                        <li v-for="(menu, index) in menus" :key="index" class="relative z-10" @mouseleave="closeSubmenu()">
                            <NuxtLink :to="menu.href ? menu.href : 'javascript:void(0)'" class="flex items-center gap-x-1 my-5" @mouseover="openSubmenu(index)">
                                <span class="font-medium text-lg text-grayscale-800">{{ index }}</span>
                                <svg v-if="menu.childs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 inline-block">
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </NuxtLink>
                            <ul :id="index" v-if="menu.childs" class="absolute right-0 bg-white shadow-md border-t-[2px] border-ivory-900 rounded-b-xl" v-show="selectedSubmenu === index">
                                <li v-for="(submenu, index) in menu.childs" :key="index" class="flex flex-col min-w-60 border-b border-gray-200 relative">
                                    <NuxtLink :to="submenu.href ? submenu.href : 'javascript:void(0)'" class="flex items-center justify-between px-3 hover:text-ivory-900 hover:fill-ivory-900" 
                                        @mouseover="openSuperSubmenu(submenu.label)">
                                        <span class="block py-2 font-medium text-sm text-navy-800">{{ submenu.label }}</span>
                                        <svg v-if="submenu.childs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </NuxtLink>
                                    <ul v-if="submenu.childs" class="absolute -top-0 left-full bg-white shadow-md -z-10 rounded-br-xl" v-show="selectedSuperSubmenu === submenu.label">
                                        <li v-for="(supersubmenu, index) in submenu.childs" :key="index" class="min-w-60 border-b border-gray-200">
                                            <NuxtLink :to="supersubmenu.href ? supersubmenu.href : 'javascript:void(0)'" class="block px-3">
                                                <span class="font-medium text-sm text-navy-800 leading-10">{{ supersubmenu.label }}</span>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li v-if="loggedIn">
                            <button class="flex items-center gap-x-1 my-5 cursor-pointer" @click="requestLogOut">
                                <span class="font-medium text-lg">ออกจากระบบ</span>
                            </button>
                        </li>
                        <li v-else>
                            <button class="flex items-center gap-x-1 my-5 cursor-pointer" @click="toggleAuthModal">
                                <span class="font-medium text-lg">บัญชีผู้ใช้</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="flex lg:hidden" @click="toggleMobileMenu(true)">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-16 stroke-primary">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <HeadlessTransitionRoot 
            id="mobile-menu" 
            class="fixed top-0 right-0 w-80 h-screen bg-white z-50 overflow-y-scroll overflow-x-hidden"
            :show="isMobileMenuOpen"
            enter="transition-transform duration-300 ease-out"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition-transform duration-300 ease-out"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
        >
            <div>
                <button class="absolute left-4 top-4" @click="toggleMobileMenu(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 stroke-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="h-48 bg-primary-700 rounded-bl-[30px] flex flex-col justify-end gap-y-5 pl-5">
                    <img class="absolute -right-24" src="/img/flower3.png" />
                    <h5 class="text-2xl text-white">ยินดีตอนรับ</h5>
                    <div class="mb-5 z-10">
                        <div v-if="loggedIn" class="text-white">
                            <span v-if="user.email">{{ user.email }}</span>
                            <span v-else>{{ user.displayName }}</span>
                        </div>
                        <div v-else>
                            <ButtonSecondary label="เข้าสู่ระบบ / สมัครสมาชิก" @click="toggleAuthModal" size="small" />
                        </div>
                    </div>
                </div>
                <div class="px-5 pt-7">
                    <ul class="space-y-7 border-b border-gray-20 pb-5">
                        <li v-for="(menu, index) in menus" :key="index">
                            <NuxtLink :to="menu.href ? menu.href : 'javascript:void(0)'" class="flex justify-between items-center leading-[24px]" @click="toggleMobileSubmenu(index)">
                                <span class="transition-color duration-100" :class="mobileSelectedSubmenu === index ? 'text-ivory-900' : 'text-primary'">{{ index }}</span>
                                <svg v-if="menu.childs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 transition-transform duration-500"
                                    :class="{ 'rotate-180 fill-ivory-900' : mobileSelectedSubmenu === index, 'fill-primary' : mobileSelectedSubmenu !== index}"
                                >
                                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </NuxtLink>
                            <HeadlessTransitionRoot 
                                v-if="menu.childs"
                                as="ul"  
                                class="pl-5 pt-5 space-y-5" 
                                :show="mobileSelectedSubmenu === index"
                            >
                                <HeadlessTransitionChild 
                                    as="li"
                                    v-for="submenu in menu.childs"
                                    :key="submenu.label"
                                    class="transition-all duration-300"
                                    enter-from="opacity-0 -translate-y-2"
                                    enter-to="opacity-100 translate-y-0"
                                    leave-from="opacity-100 translate-y-0"
                                    leave-to="opacity-0 -translate-y-2"
                                >
                                    <NuxtLink :to="submenu.href ? submenu.href : 'javascript:void(0)'" :class="submenu.childs ? 'text-sm text-grayscale-700': 'text-primary'" @click="toggleMobileMenu(false)">
                                        {{ submenu.label }}
                                    </NuxtLink>
                                    <ul v-if="submenu.childs" class="py-5 space-y-5 border-b border-gray-200">
                                        <li v-for="supersubmenu in submenu.childs" :key="supersubmenu.label">
                                            <NuxtLink :to="supersubmenu.href ? supersubmenu.href : 'javascript:void(0)'" class="text-primary" @click="toggleMobileMenu(false)">
                                                {{ supersubmenu.label }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </HeadlessTransitionChild> 
                            </HeadlessTransitionRoot>
                        </li>
                        <li v-if="loggedIn" class="cursor-pointer text-primary" @click="requestLogOut">
                            ออกจากระบบ
                        </li>
                    </ul>
                </div>
                <div class="px-5 py-7">
                    <nav class="space-y-5">
                        <a :href="contact.tel.href" class="flex items-center gap-x-2">
                            <SvgPhone class="w-6 h-6" />
                            <span class="text-sm text-grayscale-700">{{ contact.tel.label }}</span>
                        </a>
                        <a :href="contact.line.href" class="flex items-center gap-x-2">
                            <SvgLine class="w-6 h-6" />
                            <span class="text-sm text-grayscale-700">{{ contact.line.label }}</span>
                        </a>
                    </nav>
                </div>
            </div>
        </HeadlessTransitionRoot>
        <HeadlessTransitionRoot 
            id="mobile-menu-overlay" 
            class="w-screen h-screen fixed top-0 left-0 bg-primary/80 backdrop-blur z-40"
            :show="isMobileMenuOpen"
            enter="transition-all duration-150"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-all duration-150"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
        </HeadlessTransitionRoot>
    </header>
</template>

<style scoped>
#main-menu a:hover > span, #main-menu a:hover > svg {
    @apply text-ivory-900 fill-ivory-900
}
</style>