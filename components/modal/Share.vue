<script setup lang="ts">
const props = defineProps({
    isOpen: Boolean,
    url: String
});
const emit = defineEmits(['close'])

if ( process.client ) {
    useHead({
    script: [
        { 
        innerHTML: 'window.fbAsyncInit=function(){FB.init({appId:"513149586096285",xfbml:!0,version:"v19.0"})};',
        tagPosition: 'bodyOpen'
        },
        {
        src: 'https://connect.facebook.net/en_US/sdk.js',
        crossorigin: 'anonymous',
        tagPosition: 'bodyOpen',
        async: true,
        defer: true
        },
        {
        src: 'https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js',
        tagPosition: 'bodyClose',
        async: true,
        defer: true
        }
    ]
    })
}

</script>

<template>
    <UModal v-model="props.isOpen">
        <div class="flex flex-col gap-y-2 pb-14">
            <div class="flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-white cursor-pointer" @click="emit('close')">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="bg-white p-7 divide-y divide-grayscale-300">
                <header class="pb-4">
                    <h4 class="font-medium text-2xl text-navy-700">แชร์</h4>
                </header>
                <main>
                    <div class="flex py-4 gap-x-3">
                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(url)}&amp;src=sdkpreparse`" class="outline-none focus:outline-none">
                            <SvgFacebook defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                        </a>
                        <a :href="`https://social-plugins.line.me/lineit/share?url=${encodeURI(url)}`" class="outline-none focus:outline-none">
                            <SvgLine defineClass="w-8 sm:w-12 h-8 sm:h-12" />
                        </a>
                    </div>
                </main>
            </div>
        </div>
    </UModal>
</template>