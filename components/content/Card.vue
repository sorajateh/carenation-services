<template>
    <div>
        <slot />
        <div class="text-xl">
            <slot name="description"/>
        </div>
        <div class="px-4">
            <h4 class="font-noto font-medium text-lg sm:text-2xl lg:text-3xl text-center text-navy-700"><slot name="title" /></h4>
        </div>
    </div>
</template>