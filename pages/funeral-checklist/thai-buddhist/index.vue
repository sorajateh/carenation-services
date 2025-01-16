<script setup>
const route = useRoute()
</script>

<template>
   <div class="relative max-w-screen overflow-hidden">
        <img class="w-1/2 min-w-72 max-w-[620px] absolute -left-1/4 lg:-left-[10%] -top-14" src="/img/flower1.png" />
        <img class="w-1/2 min-w-72 max-w-[620px] absolute -right-1/4 lg:-right-[10%] -top-28" src="/img/flower2.png" />
        <div class="container mx-auto relative z-10">
            <div class="py-10 text-center">
                <h2 class="font-medium text-xl lg:text-2xl lg:leading-loose">
                    ขั้นตอนการจัดงานศพ
                </h2>
                <ContentDoc v-slot="{ doc }">
                    <h3 class="font-noto font-semibold text-navy-700 text-3xl lg:text-4xl leading-relaxed">
                        {{ doc.title }}
                    </h3>
                </ContentDoc>
            </div>
            <div class="flex flex-col space-y-5 mb-14">
                <ContentList :path="route.matched[0].path + '/'" v-slot="{ list }">
                    <div v-for="menu in list" :key="menu._path" class="h-auto xs:h-52 w-full lg:w-[770px] mx-auto">
                       <NuxtLink class="card h-full w-full flex flex-col xs:flex-row justify-between items-center gap-y-2 bg-white rounded-[24px] shadow-xl px-10 py-4 hover:outline hover:outline-4 hover:outline-primary-700" :to="menu._path">
                            <NuxtImg :src="'/svg/' + menu.navigation.icon" class="w-32 h-auto" />
                            <div class="px-4">
                                <h4 class="font-noto font-medium text-lg sm:text-2xl lg:text-3xl text-center text-navy-700">
                                    {{ menu.navigation.title }}
                                </h4>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-8 xs:w-12 h-8 xs:h-12 stroke-1 stroke-primary-700">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                       </NuxtLink>
                    </div>
                </ContentList>
            </div>
        </div>
    </div>
</template>