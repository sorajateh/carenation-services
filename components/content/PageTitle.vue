<template>
    <h2 class="font-noto font-semibold text-2xl sm:text-4xl text-navy-700">
        <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <ContentSlot :use="$slots.description" class="mt-6 text-grayscale-700 text-sm sm:text-base" />
</template>