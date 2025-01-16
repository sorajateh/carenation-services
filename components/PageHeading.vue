<script setup>
defineProps({
    title: String,
    hasBottomBorder: Boolean,
    center: Boolean
})
</script>

<template>
    <div class="flex items-center pt-7 pb-4 xs:py-7 lg:py-10" 
        :class="{ 
            'border-b border-grayscale-300' : hasBottomBorder,
            'flex-col' : center
        }">
        <h2 
            class="font-noto font-semibold text-2xl sm:text-[44px] text-navy-700"
            :class="{
                'text-center': center
            }"
        >
            {{ title }}
        </h2>
        <slot v-if="!center"></slot>
    </div>
</template>