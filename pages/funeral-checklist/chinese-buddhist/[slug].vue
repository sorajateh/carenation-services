<script setup>
const route = useRoute()
</script>

<template>
    <div>
        <div class="container mx-auto w-full lg:w-[842px]">
            <div class="pt-12 pb-8 flex items-center gap-x-4">
                <div class="block lg:hidden">
                    <ContentDoc v-slot="{ doc }">
                        <ButtonBack label="กลับ" :href="'/funeral-checklist/' + doc._dir" reverse />
                    </ContentDoc> 
                </div>
                <div>
                    <ContentDoc v-slot="{ doc }">
                        <ContentQuery :path="'/funeral-checklist/' + doc._dir" find="one" v-slot="{ data }">
                            <NuxtLink :to="'/funeral-checklist/' + doc._dir" class="text-grayscale-700">{{ data.title }}</NuxtLink> 
                        </ContentQuery> 
                        <ContentQuery :path="route.path" find="one" v-slot="{ data }">
                            <span class="text-navy-700"> / {{ data.title }}</span>
                        </ContentQuery> 
                    </ContentDoc>
                </div>
            </div>
        </div>
        <div class="container mx-auto w-full lg:w-[842px] px-0 sm:px-5">
            <div class="p-4 pb-7 sm:p-12 bg-white xs:rounded-3xl shadow-2xl">
                <ContentDoc v-slot="{ doc }">
                    <ImgHolder v-if="doc.image" :src="doc.image" class="mb-8" />
                    <h2 v-if="doc.title" class="font-noto font-semibold text-2xl sm:text-4xl text-navy-700">{{ doc.title }}</h2>
                    <p v-if="doc.description" class="mt-6 text-grayscale-700 text-sm sm:text-base">{{ doc.description }}</p>
                    <ContentRenderer :value="doc" unwrap="p" />
                </ContentDoc>
            </div>
        </div>
        <div class="container mx-auto w-full lg:w-[842px]">
            <div class="mb-14">
                <ContentDoc v-slot="{ doc }">
                    <ContentList 
                        :path="'/funeral-checklist/' + doc._dir + '/'"
                        :query="{
                            where: [
                                {
                                    _path: { $not: doc._path },
                                }
                            ],
                            sort: [
                                {
                                    file: 1
                                }
                            ]
                        }"
                        v-slot="{ list }"
                    >
                        <div class="py-12 mt-12 border-t-2 border-t-primary-500/10">
                            <h3 class="font-sarabun text-lg sm:text-2xl text-navy-700 px-5">ขั้นตอนอื่นๆ</h3>
                            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div v-for="col in list" :key="col._path">
                                    <NuxtLink :to="col._path" class="h-auto sm:h-80 p-6 bg-white rounded-3xl shadow-2xl flex flex-col justify-between items-center gap-y-3 hover:outline hover:outline-4 hover:outline-primary-700">
                                        <NuxtImg class="w-32 h-auto" :src="'/svg/'+col.navigation.icon" />
                                        <h6 class="text-base sm:text-lg text-center text-navy-700">{{ col.navigation.title }}</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 stroke-1 stroke-primary-700">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </ContentList>
                </ContentDoc>
            </div>
        </div>
    </div>
</template>