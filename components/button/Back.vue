<script setup>
defineProps({
    label: String,
    href: String,
    reverse: Boolean
})
</script>

<template>
    <NuxtLink 
        :to="href ? href : 'javascript:void(0)'" 
        class="inline-flex justify-between items-center gap-x-2 h-12 border-[1.5px] rounded-full px-4"
        :class="{ 'flex-row-reverse' : reverse, 'border-navy-500/30 disabled' : !href, 'border-primary-700': href }"
    >
        <span class="font-medium" :class="href ? 'text-primary-700' : 'text-navy-500/30'">{{ label ? label : 'Go to link' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
            class="w-5 h-5"
            :class="{ 'rotate-180' : reverse, 'fill-navy-500/30' : !href, 'fill-navy-700 hover:fill-ivory' : href }"
        >
            <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
        </svg>
    </NuxtLink>
</template>

<style scoped>
a:not(.disabled):hover {
    @apply border-ivory-900 cursor-pointer
}
a:not(.disabled):hover > span {
    @apply text-ivory-900
}
a:not(.disabled):hover > svg {
    @apply fill-ivory-900
}
</style>