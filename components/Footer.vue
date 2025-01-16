<script setup>
import { ref } from 'vue'

const menus = ref({
    "ขั้นตอนการจัดงานศพ": {
        href: "#",
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
    "สินค้าและบริการ": {
        href: "#",
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
                label: "วิธีการสั่งซื้อ",
                href: "https://care-nation.com/how-to-order/"
            },
            {
                label: "แจ้งชำระเงิน",
                href: "https://care-nation.com/confirm-payment/"
            }
        ]
    },
    "เกี่ยวกับเรา": {
        href: "#",
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
    }
})

const channels = ref([
    {
        type: "facebook",
        href: "https://www.facebook.com/CarenationThailand"
    },
    {
        type: "line",
        href: "https://line.me/R/ti/p/%40gzy2715m"
    },
    {
        type: "instagram",
        href: "https://www.instagram.com/carenation.thailand"
    },
    {
        type: "x",
        href: "https://twitter.com/CarenationTh"
    },
    {
        type: "youtube",
        href: "https://www.youtube.com/channel/UCEfaxb5iYRbjWakXgsfX5sQ"
    }
])
</script>

<template>
    <footer class="py-10 bg-ivory-50">
        <div class="container mx-auto flex flex-col-reverse sm:flex-col gap-y-6">
            <div class="flex flex-row flex-wrap gap-y-5">
                <div class="w-full sm:w-1/2 lg:w-1/4 pr-5">
                    <h5 class="font-noto font-medium text-xl sm:text-3xl text-navy-700">Why Carenation</h5>
                    <p class="mt-4 text-xs sm:text-base text-grayscale-700">
                        Carenation เป็นกิจการเพื่อสังคมที่ต้องการแก้ปัญหาด้านสังคมและสิ่งแวดล้อม<br/><br/>เรามอบงานให้ชุมชนและเราบริจาคอย่างโปร่งใส โดยทุกท่านจะได้รับใบเสร็จการบริจาคที่นำไปลดหย่อนภาษีได้
                    </p>
                </div>
                <div v-for="(menu, index) in menus" :key="index" class="w-1/2 lg:w-1/4 pr-5 hidden sm:block">
                    <h6 class="font-medium text-2xl text-navy-700 mb-4">{{ index }}</h6>
                    <ul v-if="menu.childs" class="flex flex-col space-y-1">
                        <li v-for="(submenu, index) in menu.childs" :key="index">
                            <NuxtLink :to="submenu.href ? submenu.href : 'javascript:void(0)'" class="text-sm text-navy-700">
                                {{ submenu.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-b-2 sm:border-b-0 border-t-0 sm:border-t-2 border-primary-500/10 pt-0 sm:pt-5 pb-5 sm:pb-0">
                <h5 class="font-medium text-3xl text-navy-700 mb-2 hidden sm:block">ติดตามข่าวสาร</h5>
                <div class="block sm:hidden mb-5">
                    <SvgLogo defineClass="w-40 h-auto fill-primary-700 stroke-none" />
                </div>
                <div class="flex flex-col sm:flex-row gap-5">
                    <div>
                        <nav class="flex gap-x-2 sm:gap-x-4">
                            <NuxtLink v-for="channel in channels" :key="channel.type" :to="channel.href ? channel.href : 'javascript:void(0)'">
                                <div v-if="channel.type === 'facebook'">
                                    <SvgFacebook defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                                </div>
                                <div v-if="channel.type === 'line'">
                                    <SvgLine defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                                </div>
                                <div v-if="channel.type === 'instagram'">
                                    <SvgInstagram defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                                </div>
                                <div v-if="channel.type === 'x'">
                                    <SvgX defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                                </div>
                                <div v-if="channel.type === 'youtube'">
                                    <SvgYoutube defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                                </div>
                            </NuxtLink>
                        </nav>
                    </div>
                    <div class="text-navy-700">
                        <div>โทร: <a href="tel:0929629524">092-962-9524</a></div>
                        <div>เวลาทำการ: 8.00 - 19.00 น.</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>