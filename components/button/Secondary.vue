<script setup>
defineProps({
    label: String,
    href: [String, Object],
    block: Boolean,
    disabled: Boolean,
    reverse: Boolean,
    icon: String,
    transparent: Boolean,
    size: {
        type: String,
        default: 'medium'
    },
    loading: Boolean
})
</script>

<template>
    <NuxtLink 
        :to="disabled ? 'javascript:void(0)' : href ? href : 'javascript:void(0)'" 
        class="min-w-28 justify-center items-center gap-x-2 rounded-full border-[1.5px] outline-none focus:outline-none"
        :class="{ 
            'flex' : block,
            'inline-flex' : !block,
            'flex-row-reverse reverse' : reverse, 
            'border-primary-500/30 disabled' : disabled,
            'border-primary-700': !disabled,
            'h-16 px-7' : size === 'large',
            'h-12 px-5' : size === 'medium',
            'h-10 px-3' : size === 'small',
            'bg-white' : !transparent,
            'loading cursor-wait' : loading
        }"
    >
        <div 
            class="font-semibold"
            :class="{
                'text-navy-500/30' : disabled,
                'text-navy-700' : !disabled,
                'text-lg' : size === 'large',
                'text-base' : size === 'medium',
                'text-base' : size === 'small'
            }"
        >
            <span v-if="loading">กำลังโหลด...</span>
            <span v-else>{{ label ? label : 'Go to link' }}</span>
        </div>
        <svg v-show="loading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-grayscale-400" d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
            <path class="fill-primary-700" d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
        </svg>
        <svg v-if="icon === 'arrow' && !loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
        </svg>
        <svg v-if="icon === 'plus' && !loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>
        <svg v-if="icon === 'share' && !loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
        </svg>
        <svg v-if="icon === 'download' && !loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>
        <svg v-if="icon === 'checked' && !loading"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg>
    </NuxtLink>
</template>

<style scoped>
/* a.reverse > svg {
    @apply rotate-180
} */
a.disabled {
    @apply cursor-not-allowed
}
a.disabled > svg {
    @apply fill-primary-500/30
}
a:not(.disabled,.loading):hover {
    @apply border-ivory-900 cursor-pointer
}
a:not(.disabled,.loading):hover span {
    @apply text-ivory-900
}
a:not(.disabled,.loading):hover svg {
    @apply fill-ivory-900
}
</style>