<script setup>
defineProps({
    title: String,
    desc: String,
    invert: Boolean,
    buttonLabel: String,
    buttonLink: String,
    imgSrc: String,
    borderless: Boolean
})
</script>

<template>
    <div class="mt-6">
        <h4 class="font-medium text-lg sm:text-2xl text-navy-700 mb-6">
            <ContentSlot :use="$slots.title" unwrap="p" />
        </h4>
        <div 
            class="flex gap-y-4 sm:gap-y-6"
            :class="invert ? 'flex-col sm:flex-col-reverse' : 'flex-col'"
        >
            <div :class="{ 'pl-4 border-l-2 border-l-navy-500/10' : !borderless}">
                <div class="text-grayscale-700 space-y-3">
                    <ContentSlot :use="$slots.description" />
                </div>
                <div v-if="buttonLabel" class="mt-6 hidden sm:block">
                    <ButtonSecondary :label="buttonLabel" :href="buttonLink" :disabled="!buttonLink" />
                    <span v-if="!buttonLink" class="text-base text-navy-700 ml-2">เร็ว ๆ นี้</span>
                </div>
            </div>
            <ImgHolder :src="imgSrc" />
            <div v-if="buttonLabel" class="block sm:hidden">
                <ButtonSecondary :label="buttonLabel" :href="buttonLink" :disabled="!buttonLink" />
                <span v-if="!buttonLink" class="text-base text-navy-700 ml-2">เร็ว ๆ นี้</span>
           </div>
        </div>
    </div>
</template>