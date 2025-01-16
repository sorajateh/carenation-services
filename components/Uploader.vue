<template>
    <div class="pt-2 pb-7">
        <div v-if="files.length === 0">
            <input type="file" @change="onInputChange" class="w-28 relative file:z-0 file:w-28 file:h-28 file:appearance-none file:rounded-none file:text-transparent file:m-0 file:border file:border-solid file:border-primary-800 file:ring-0 file:cursor-pointer file:bg-white file:hover:bg-grayscale-100" />
        </div>
        <ul v-else>
            <li v-for="file of files" :key="file.id" class="w-28 h-28 border border-solid border-grayscale-500 bg-primary-700 relative">
                <!-- <svg @click="removeFile(file)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 absolute top-1/2 left-1/2 -mt-3.5 -ml-3.5 fill-white cursor-pointer z-20">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg> -->
                <img class="w-full h-full object-cover object-center" :src="file.url" :alt="file.file.name" :title="file.file.name" />
                <!-- <button @click="removeFile(file)" class="close-icon">&times;</button> -->
            </li>
        </ul>
        <div class="font-medium text-[13px] text-grayscale-500 mt-1">
            <span v-if="files.length" @click="removeFiles()" class="cursor-pointer hover:underline">เปลี่ยนภาพ</span>
            <span v-else>ขนาดไฟล์ไม่เกิน 1 MB.</span>
        </div>
    </div>
</template>

<script setup>

const files = ref([])
const tooLarge = ref(false)

function onInputChange(e) {
	addFiles(e.target.files)
	e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
}

function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !fileExists(file.id))
    files.value = files.value.concat(newUploadableFiles)

    tooLarge.value = files.value.some(({ size }) => size > 1048576)

    // let smallUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => file.size < 1048576 && !fileExists(file.id))
    // console.log('aaa', smallUploadableFiles)
}

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId)
}

function removeFiles() {
	files.value = []
}

class UploadableFile {
	constructor(file) {
		this.file = file
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		this.status = null
        this.size = file.size
	}
}

</script>

<style scoped>
input[type=file]:after {
    content: '';
    background-image: url('/svg/plus.svg');
    background-size: 16px 16px;
    @apply block w-10 h-10 absolute top-1/2 left-1/2 -mt-5 -ml-5 z-10 bg-no-repeat bg-center cursor-pointer;
}
</style>
