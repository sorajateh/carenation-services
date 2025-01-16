<script setup>
defineProps({
    label: String,
    to: String
})
</script>

<template>
    <NuxtLink :to="to" class="inline-flex items-center gap-x-1 mt-7" :class="{ 'disabled': !to }" target="_blank">
        <span class="text-navy-700 underline">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </span>
        <SvgExternal defineClass="w-4 h-4 fill-none stroke-2 stroke-primary-700 inline-block" />
    </NuxtLink>
</template>

<style scoped>
a:not(.disabled):hover > span {
    @apply text-ivory-900
}
a:not(.disabled):hover > svg {
    @apply stroke-ivory-900
}
</style>
