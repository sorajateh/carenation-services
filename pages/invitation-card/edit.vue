<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { FormError, FormSubmitEvent } from '#ui/types'
import { sub, subDays, format, formatDistance, isSameDay, setDefaultOptions, type Duration } from 'date-fns'
//@ts-ignore
import { th } from 'date-fns/locale/index.js'

useSeoMeta({
  title: 'สร้างการ์ดเชิญงานศพ',
})

setDefaultOptions({ locale: th })

const queryParams = { card_id: nanoid() };
const router = useRouter();
const route = useRoute();

const { loggedIn, user } = useUserSession()

const fetching = ref(false)
const cardImgLoaded = ref([false, false, false])
const isCardsModalOpen = ref(false)

function openCardsModal() {
    isCardsModalOpen.value = true
}
function closeCardsModal() {
    isCardsModalOpen.value = false
    cardImgLoaded.value = [false, false, false]
}

function changeCard(id: any) {
    state.selectedCard = id
    isCardsModalOpen.value = false
    sessionStorage.setItem("carenation-invitation-card", JSON.stringify({ selectedCard: id }));
}

// if ( typeof route.query.card_id === 'undefined'  ) {
//     router.push({ path: route.path, query: { card_id: activeCardId } });
// } 

// const times = [1,2,3,4,5]
// let times = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

const suggestions = [
    'พิธีรดน้ำศพ', 
    'พิธีสวดพระอภิธรรม', 
    'พิธีสวดพระพุทธมนต์',
    'พิธีสวดมาติกา-บังสุกุล',
    'พิธีฌาปนกิจ'
]

const state = reactive({
    cardId: 0,
    isDatePicked: false,
    avatarData: '', 
    selectedCard: 1,
    firstName: '',
    lastName: '',
    location: '',
    selectedDates: {
        start: new Date(), //new Date(), 
        end: new Date() //new Date() 
    },
    schedules: [{
        appointment: [
            {
                hour: '',
                caption: '',
                focused: false
            }
        ],
        selectableTime: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        sameAsDayBefore: false
    }],
    onlineMemorialConnected: false,
    postscript: 'จึงขอกราบเรียนเชิญทุกท่านด้วยความเคารพนับถือ ขออภัยหากไม่ได้มาเรียนเชิญด้วยตัวเอง',
    isPublish: false
})

const convertDate = (dateString: string) => {
    const dateArray =  dateString.split(' ')
    const index: number = parseInt(dateArray[dateArray.length-1])
    const modifiedYear = Math.abs(index + 543)
    return [dateArray[0], dateArray[1], modifiedYear].join(' ')
}

function orderedTimes(times: any) {
    return times.sort((a: any, b: any) => convertHourToInt(a) - convertHourToInt(b));
}

const distance = ref(1)
const activeApm = ref(1)

function appointmentFocus(index: number, i: number) {
    state.schedules[index].appointment[i].focused = true
}
function appointmentBlur(index: number, i: number) {
    state.schedules[index].appointment[i].focused = false
}

function getDateString(index: number, length: number) {
    const distance = Math.abs((new Date(state.selectedDates.start).getTime() - new Date(state.selectedDates.end).getTime()) / 86400000) + 1
    let string
    if ( index === 0) {
        string = convertDate(format(state.selectedDates.start, 'd MMMM yyy'))
    }
    else if ( index === length ) {
        string = convertDate(format(state.selectedDates.end, 'd MMMM yyy'))
    } else {
        string = distance > 3 ? convertDate(format(subDays(state.selectedDates.end, distance-2), 'd MMMM yyy')) + ' - ' + convertDate(format(subDays(state.selectedDates.end, 1), 'd MMMM yyy')) : convertDate(format(subDays(state.selectedDates.end, 1), 'd MMMM yyy'))
    }
    return string
    // return convertDate(format(subDays(state.selectedDates.end, (distance.value-1)-index), 'd MMMM yyy'))
}

async function addDay() {
      const obj: any = {
        appointment: [],
        selectableTime: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        sameAsDayBefore: false
    }
    state.schedules.push(obj);
};

function addSchedule(day: number) {
    if ( countApm.value < 15 ) {
        const obj: any = {
            hour: '',
            caption: ''
        }
        state.schedules[day].appointment.push(obj)
    }
}

function removeSchedule(day: number, index: number, selected: string) {
    state.schedules[day].appointment.splice(index, 1)
    const i = state.schedules[day].selectableTime.indexOf(selected);
    if (i < 0) {
        state.schedules[day].selectableTime.push(selected)
    }
}

function removeDailySchedule(day: number) {
    state.schedules[day].appointment = []
}

function convertHourToInt(timeString: string) {
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    return hours * 60 + minutes;
}

function reorderAppointment(day: number, selected: string) {
    state.schedules[day].appointment.sort((a: any, b: any) => convertHourToInt(a.hour) - convertHourToInt(b.hour));
    const index = state.schedules[day].selectableTime.indexOf(selected);
    if (index > -1) {
        state.schedules[day].selectableTime.splice(index, 1);
    }
}

function getRoundedCanvas(sourceCanvas: any) {
      var canvas = document.createElement('canvas');
      var context: any = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      canvas.setAttribute("id", "avatar");
      canvas.classList.add('max-w-full');
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
    //   context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      const dataURL = canvas.toDataURL('image/jpeg', 0.5);
      state.avatarData = dataURL
      return canvas;
    }

const processing = ref(false)
const showCropper = ref(false)
const isCropped = ref(false)
const cropperShown = ref(false)
const isDatePickerOpen = ref(false)

function uploadHandler(cropper: any) {
    var result: any = document.getElementById('result');
    result.appendChild(getRoundedCanvas(cropper.getCroppedCanvas()));
    // if ( result.hasChildNodes() ) {
        isCropped.value = true       
    // }
}

function removeUpload() {
    isCropped.value = false
    cropperShown.value = false
    state.avatarData = ""
    var result: any = document.getElementById('result');
    result.innerHTML = '';
}

function changeUpload() {
    showCropper.value = true
}

function getFile(event: any) {
    removeUpload()
    event.file ? cropperShown.value = true : cropperShown.value = false
}

function handleCropSuccess(createImgUrl: string) {
    state.avatarData = createImgUrl
    // Handle the emitted data here
}

const cardTitle = computed(() => {
    const suffix = !loggedIn ? '(guest)' : ''
    return state.firstName + ' ' + state.lastName + suffix
})

const isCardsLoaded = computed(() => {
    //@ts-ignore
    return cardImgLoaded.value.every(v => v === true);
})

async function onSubmit (event: FormSubmitEvent<any>) {
    // event.data.schedules = removeUnusedData(event.data.schedules)
    // console.log(event.data)
    processing.value = true
    if ( !state.cardId ) {
        const post: any = await $fetch('/api/card', {
            method: 'post',
            body: {
                title: cardTitle.value
            }
        })
        state.cardId = post.id
    } 
    sessionStorage.setItem("carenation-invitation-card", JSON.stringify(event.data));
    setTimeout(() => {
        processing.value = false
        // @ts-ignore
        if ( state.isPublish ) {
            navigateTo(`/invitation-card/preview/${state.cardId}`)
        } else {
            navigateTo('/invitation-card/preview')
        }
    }, 3000);
    
}

function formData(localData: any, isPublish: boolean) {
    localData.cardId ? state.cardId = localData.cardId : null
    localData.cardId ? state.isDatePicked = true : false
    localData.avatarData ? state.avatarData = localData.avatarData : null
    localData.firstName ? state.firstName = localData.firstName : null
    localData.lastName ? state.lastName = localData.lastName : null
    localData.selectedCard ? state.selectedCard = localData.selectedCard : null
    localData.location ? state.location = localData.location : null
    isPublish ? state.isPublish = true : null
    if ( localData.selectedDates ) {
        state.selectedDates.start = new Date(localData.selectedDates.start) ? new Date(localData.selectedDates.start) : new Date()
        state.selectedDates.end = new Date(localData.selectedDates.end) ? new Date(localData.selectedDates.end) : new Date()
    }    
    localData.schedules ? state.schedules = localData.schedules : null
    localData.postscript ? state.postscript = localData.postscript : null
}

const countApm = computed(() => {
    let num = 0
    //@ts-ignore
    state.schedules.forEach(function(d) {
        if (d.appointment.length > 0) {
            num = num + d.appointment.length
        } 
    });
    return num
})

watch(
  () => state.selectedDates,
  (newValue: any, oldValue: any) => {
    const newRange = Math.abs((new Date(newValue.start).getTime() - new Date(newValue.end).getTime()) / 86400000) + 1
    const oldRange = Math.abs((new Date(oldValue.start).getTime() - new Date(oldValue.end).getTime()) / 86400000) + 1

    state.isDatePicked = true

    if ( newRange === 2 ) {
        state.schedules[1].sameAsDayBefore = false
    }

    if ( newRange > oldRange) {
        const diff = newRange - oldRange;
        if ( newRange < 3 && diff < 3) {
            for (let n = 0; n < diff; n++) {
                addDay()       
            }
        } else {
            for (let n = oldRange; n < 3; n++) {
                addDay()       
            }
        }
    } else {
        if ( newRange < 3 ) {
            if ( oldRange > 3 ) {
                const diff = 3 - newRange
                state.schedules.splice(state.schedules.length - diff, diff)
            } else {
                const diff = oldRange - newRange
                state.schedules.splice(state.schedules.length - diff, diff)
            }
        }
    }
  }
)

watch(isCardsModalOpen, (newValue: any) => {
    if (!newValue) {
        cardImgLoaded.value = [false, false, false]
    } 
})

if (loggedIn.value && route.params.id) {
    fetching.value = true
    $fetch(`/api/card/${route.params.id}`, { method: 'get' }).then((response) => {
        //@ts-ignore
        if ( response.acf.owner_user_id === user.value.id.toString() ) {
            //@ts-ignore
            formData(JSON.parse(response.acf.card_data), true)
        } 
        fetching.value = false
    }).catch((error) => {
        navigateTo('/invitation-card/saved-cards')
    }) 
}

onMounted(() => {
    if (!sessionStorage.getItem("carenation-invitation-card")) {
        // @ts-ignore
        sessionStorage.setItem("carenation-invitation-card", JSON.stringify({ selectedCard: 1 }))
    } else {
        // @ts-ignore
        formData(JSON.parse(sessionStorage.getItem("carenation-invitation-card")), false)
    }
})

</script>

<template>
    <UForm ref="form" :state="state" class="relative space-y-10" @submit="onSubmit">
        <div v-show="fetching" class="w-full h-full absolute top-0 left-0 bg-white/60 z-20 cursor-wait"></div>
        <section>
            <div class="container mx-auto relative">
                <div v-show="processing" class="w-full h-full absolute top-0 left-0 bg-grayscale-100/60 z-50 cursor-wait"></div>
                <PageHeading title="สร้างการ์ดเชิญงานศพ" />
                <div class="card-switcher w-full md:w-1/2 max-w-[358px] flex items-center gap-x-5 bg-primary-400 rounded-lg p-4 mb-14">
                    <img v-if="state.selectedCard" class="img-holder h-28" :src="`/img/card-`+ state.selectedCard +`.jpg`" />
                    <span class="text-sm text-white underline cursor-pointer" @click="openCardsModal()">เปลี่ยนรูปแบบ</span>
                    <input name="selected-card" type="hidden" v-model="state.selectedCard" />
                </div>
            </div>
            <UModal v-model="isCardsModalOpen" :ui="{width: 'w-full sm:max-w-[1120px]'}">
                <div v-show="isCardsLoaded">
                    <div class="absolute z-10 -top-10 -right-10">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-white cursor-pointer" @click="closeCardsModal()">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="text-center pb-5">
                        <h4 class="font-noto font-medium text-3xl text-ivory-50">เปลี่ยนรูปแบบการ์ดเชิญ</h4>
                    </div>
                    <div class="grid grid-cols-3 gap-x-5">
                        <div v-for="i in 3" :key="i" class="relative overflow-hidden">
                            <div class="relative" :class="{ 'm-1' : i !== state.selectedCard }"  @click="changeCard(i)">
                                <img :src="`/img/card-${i}.png`" :class="{ 'border-4 border-primary-900' : i == state.selectedCard }" @load="cardImgLoaded[i-1] = true"/>
                                <button type="button" v-if="i != state.selectedCard" class="selectable-card size-full absolute top-0 left-0 z-20 hidden sm:flex justify-center items-center bg-transparent hover:bg-primary-700/30 cursor-pointer">
                                    <div class="px-7 py-3 rounded-full border-[1.5px] border-primary-700 bg-white invisible">
                                        <span class="font-semibold text-navy-700">เปลี่ยนมาใช้รูปแบบนี้</span>
                                    </div>
                                </button>
                            </div>
                            <div v-if="i == state.selectedCard" class="size-10 rounded-bl-2xl bg-primary-700 absolute top-0 right-0 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 fill-white">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </UModal>
        </section>
        <section class="flex flex-col gap-y-6 mb-10">
            <div class="container mx-auto relative">
                <div class="py-7 relative">
                    <div v-show="processing" class="w-full h-full absolute top-0 left-0 bg-white/60 z-10 cursor-wait"></div>
                    <SectionTitle title="ใส่ข้อมูลผู้วายชนม์" />
                    <!-- <Uploader  /> -->
                    <!-- avatarData: {{ state.avatarData }}
                    showCropper: {{ showCropper }}
                    isCropped: {{ isCropped }}
                    cropperShown: {{ cropperShown }} -->
                    <AvatarUploader :initialImgUrl="state.avatarData" @crop-success="handleCropSuccess" />
                    <div class="hidden pt-2 pb-7">
                        <h5 class="font-medium text-navy-700 mb-2">อัพโหลดรูปภาพผู้วายชนม์ <span class="text-grayscale-500">(ถ้ามี)</span></h5>
                        <button v-if="!state.avatarData" type="button" @click="changeUpload()" class="w-28 h-28 border border-primary-700 hover:bg-grayscale-100" :class="{ 'hidden' : cropperShown}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-5 h-5 stroke-primary-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        <div>
                            <div id="result" class="w-28 h-28 overflow-hidden" style="display: none;"></div>
                            <div v-show="state.avatarData" class="w-28 h-28 rounded-full overflow-hidden">
                                <img :src="state.avatarData" />
                            </div>
                            <div v-show="state.avatarData" class="font-medium text-[13px] text-grayscale-500 space-x-2 mt-2"> 
                                <button class="cursor-pointer hover:underline" type="button" @click="changeUpload()">เปลี่ยนภาพ</button>
                                <button class="cursor-pointer hover:underline" type="button" @click="removeUpload()">ลบภาพ</button>
                            </div>
                        </div>
                        <ClientOnly>
                            <avatar-cropper
                                v-model="showCropper"
                                :inline="true"
                                :labels="{ submit: 'ยืนยัน', cancel: 'ยกเลิก' }"
                                :upload-handler="uploadHandler"
                                :cropper-options="{ aspectRatio: 1/1, viewMode: 2, zoomable: false }"
                                mimes="image/png, image/gif, image/jpeg, image/bmp"
                                @changed="getFile"
                                @cancel="cropperShown = false"
                            />
                        </ClientOnly>
                        <input type="hidden" v-model="state.avatarData" />
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <UFormGroup label="ชื่อ" required>
                            <UInput size="xl" v-model="state.firstName" placeholder="ชื่อ" required />
                        </UFormGroup>
                        <UFormGroup label="นามสกุล" required>
                            <UInput size="xl" v-model="state.lastName" placeholder="นามสกุล" required />
                        </UFormGroup>
                    </div>
                </div>
                <div class="py-7 relative">
                    <div v-show="processing" class="w-full h-full absolute top-0 left-0 bg-white/60 z-10 cursor-wait"></div>
                    <SectionTitle title="ใส่ข้อมูลสถานที่และกำหนดการ" />
                    <div class="space-y-4">
                        <UFormGroup label="สถานที่" name="location" required>
                            <UInput size="xl" v-model="state.location" placeholder="สถานที่" required/>
                        </UFormGroup>
                        <UFormGroup label="กำหนดการรายวัน" name="daily-appointment" required>
                            <UButtonGroup size="xl" class="date-picker" orientation="horizontal" :ui="{ wrapper: { horizontal: 'flex'} }">
                                <UInput placeholder="เลือกช่วงวันที่" disabled :modelValue="state.isDatePicked ? convertDate(format(state.selectedDates.start, 'd MMM yyy')) + ' - ' + convertDate(format(state.selectedDates.end, 'd MMM yyy')) : ''"/>
                                <!-- <UInput size="lg" placeholder="เลือกช่วงวันที่" disabled /> -->
                                <UPopover :popper="{ placement: 'bottom-end' }" v-model:open="isDatePickerOpen">
                                    <UButton size="xl" color="white" square>
                                        <svg class="w-4 h-4 fill-grayscale-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4,.5c0-.13-.05-.26-.15-.35-.09-.09-.22-.15-.35-.15s-.26.05-.35.15c-.09.09-.15.22-.15.35v.5h-1c-.53,0-1.04.21-1.41.59-.38.38-.59.88-.59,1.41v1h16v-1c0-.53-.21-1.04-.59-1.41-.38-.38-.88-.59-1.41-.59h-1v-.5c0-.13-.05-.26-.15-.35-.09-.09-.22-.15-.35-.15s-.26.05-.35.15c-.09.09-.15.22-.15.35v.5H4v-.5ZM16,14V5H0v9c0,.53.21,1.04.59,1.41.38.38.88.59,1.41.59h12c.53,0,1.04-.21,1.41-.59.38-.38.59-.88.59-1.41ZM12.5,7h1c.13,0,.26.05.35.15.09.09.15.22.15.35v1c0,.13-.05.26-.15.35-.09.09-.22.15-.35.15h-1c-.13,0-.26-.05-.35-.15-.09-.09-.15-.22-.15-.35v-1c0-.13.05-.26.15-.35.09-.09.22-.15.35-.15Z"/></svg>
                                    </UButton>
                                    <template #panel="{ close }">
                                        <DatePicker v-model="state.selectedDates" is-required @close="close" />
                                    </template>
                                </UPopover>
                            </UButtonGroup>
                        </UFormGroup>
                        <div v-if="state.isDatePicked" class="space-y-4">
                            <div v-for="(day, index) in state.schedules" :key="index" class="p-4 rounded-lg bg-primary-100">
                                <div>
                                    <h6 class="text-sm font-medium text-grayscale-700 w-4/5 xs:w-auto">
                                        กำหนดการ<span v-if="state.schedules.length > 1"><span v-if="index === 0">วันแรก</span><span v-else-if="index === state.schedules.length-1">วันฌาปนกิจ</span><span v-else>ทั่วไป</span></span>: 
                                        <br class="block xs:hidden" />{{ getDateString(index, state.schedules.length-1) }}
                                    </h6>
                                    <div v-if="index > 0 && index < state.schedules.length - 1" class="mt-3 flex items-center gap-x-2">
                                        <UToggle size="lg" v-model="day.sameAsDayBefore" name="same-as-day-before" @change="removeDailySchedule(index)" />
                                        <span class="font-semibold text-base text-navy-700">ใช้กำหนดการเดียวกับวันแรก</span>
                                    </div>
                                </div>
                                <div v-show="!day.sameAsDayBefore" class="space-y-2 mb-4 mt-2">
                                    <div v-for="(schedule, i) in day.appointment" :key="i" class="flex flex-col xs:flex-row gap-2">
                                        <div class="w-28 flex-none">
                                            <USelectMenu 
                                                size="xl" 
                                                :options="orderedTimes(state.schedules[index].selectableTime)" 
                                                v-model="state.schedules[index].appointment[i].hour" 
                                                required 
                                                @change="reorderAppointment(index, state.schedules[index].appointment[i].hour)" 
                                                :uiMenu="{ required: 'absolute w-full opacity-100 text-transparent focus:z-10 bg-transparent focus:outline-none border-0 border-white focus:border caret-transparent cursor-default rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-primary-500' }"
                                            />
                                        </div>
                                        <div class="grow flex gap-x-1">
                                            <div class="flex flex-col grow">
                                                <!-- <input type="text" class="grow px-3.5 py-2.5 text-base text-gray-900 disabled:cursor-not-allowed disabled:opacity-75 border-0 font-medium form-input rounded-md shadow-sm bg-white ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-500" placeholder="กำหนดการ" :required="!day.sameAsDayBefore" maxlength="30" v-model="state.schedules[index].appointment[i].caption" /> -->
                                                <div class="relative grow rounded-xl" :class="{ 'suggestions-container-focused': state.schedules[index].appointment[i].focused }">
                                                   <div class="input-schedule flex absolute top-0 z-[1]">
                                                        <div class="grow">
                                                            <!-- <UInput size="xl" v-model="state.schedules[index].appointment[i].caption" :ui="{ rounded: 'rounded-r-none', color: { white: { outline: `ring-1 ${state.schedules[index].appointment[i].focused ? 'ring-white': null}` } } }" /> -->
                                                            <input type="text" v-model="state.schedules[index].appointment[i].caption" class="relative block w-full mt-[1px] ml-[1px] disabled:cursor-not-allowed outline-none focus:outline-none border-0 font-medium disabled:opacity-100 form-input rounded-l-xl placeholder-grayscale-400 text-sm px-[15px] py-[15px] bg-white focus:border-0 ring-0 ring-inset ring-white focus:ring-0 focus:ring-white shadow-none text-primary pe-12" :class="{ 'ring-white': state.schedules[index].appointment[i].focused }" @focus="appointmentFocus(index, i)" @blur="appointmentBlur(index, i)"/>
                                                        </div>
                                                   </div>
                                                    <!-- <div :class="{ 'relative z-20': state.schedules[index].appointment[i].focused }"> -->
                                                        <UInputMenu class="suggestions-dropdown" size="xl" placeholder="กำหนดการ" :required="!day.sameAsDayBefore" maxlength="30" v-model="state.schedules[index].appointment[i].caption" :options="suggestions" :popper="{ placement: 'bottom-start', offsetDistance: 0 }" selected-icon="" @focus="appointmentFocus(index, i)" @blur="appointmentBlur(index, i)" :ui="{ icon: { base: 'text-primary-700' } }">
                                                            
                                                        </UInputMenu>
                                                    <!-- </div> -->
                                                </div>
                                            </div>
                                            <!-- <UInput :ref="index + i" size="xl" class="grow" placeholder="กำหนดการ" v-model="state.schedules[index].appointment[i].caption" :required="!day.sameAsDayBefore" /> -->
                                            <!-- <UButton class="flex-none" size="lg" icon="i-heroicons-minus-circle" :padded="false" color="gray" @click="removeSchedule(index, i, state.schedules[index].appointment[i].hour)" /> -->
                                            <button type="button" v-show="index > 0 || i > 0" @click="removeSchedule(index, i, state.schedules[index].appointment[i].hour)">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 fill-red-700">
                                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <ButtonSecondary v-show="!day.sameAsDayBefore" size="small" label="เพิ่มกำหนดการ" icon="plus" reverse @click="addSchedule(index)" :disabled="countApm >= 15" />
                                <!-- <ButtonSecondary size="small" label="เพิ่มกำหนดการ" icon="plus" reverse @click="addSchedule(index, i)" 
                                    :disabled="schedules[index].appointment.at(-1).hour && schedules[index].appointment.at(-1).caption ? false : true"
                                /> -->
                            </div>
                        </div>
                        <div v-else class="bg-primary-600/5 rounded-xl h-[150px] flex justify-center items-center">
                            <div class="font-medium text-sm text-grayscale-700">กรุณาเลือกช่วงเวลาจัดงานศพ เพื่อสร้างกำหนดการ</div>
                        </div>
                        <!-- <ButtonPrimary size="small" label="เพิ่มวัน" icon="plus" reverse @click="addDay()" /> -->
                    </div>
                    <div v-show="countApm > 12" class="text-[13px] text-navy-600 mt-2">
                        * หากมีการกำหนดรายการตั้งแต่ 12 รายการขึ้นไป ขนาดตัวอักษรจะถูกปรับให้เล็กลง และสามารถเพิ่มจำนวนรายการได้สูงสุดไม่เกิน 15 รายการต่อการ์ดเชิญ
                    </div>
                </div>
                <div class="py-7 relative">
                    <div v-show="processing" class="w-full h-full absolute top-0 left-0 bg-white/60 z-10 cursor-wait"></div>
                    <SectionTitle title="ใส่ข้อมูลอื่นๆ" />
                    <div>
                        <UFormGroup label="คำปิดท้าย" name="location">
                            <UTextarea size="xl" color="white" variant="outline" name="postscript" v-model="state.postscript" />
                        </UFormGroup>
                        <div class="hidden items-center gap-x-2 mt-5">
                            <UToggle v-model="state.onlineMemorialConnected" disabled />
                            <span class="font-semibold text-grayscale-500">เชื่อม Online Memorial</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-primary-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-10 mx-auto pb-20">
                    <!-- <UButton v-show="!processing" type="submit" size="xl" block :ui="{ rounded: 'rounded-full' }"> -->
                    <!-- <ButtonPrimary v-show="processing" block loading /> -->
                    <UButton v-show="!processing" type="submit" size="xl" :ui="{ rounded: 'rounded-full' }">
                        สร้างการ์ดเชิญงานศพ
                    </UButton>
                    <ButtonPrimary v-show="processing" block loading />
                </div>
            </div>
        </section>
    </UForm>
</template>

<style scoped>
.container {
    @apply max-w-[752px];
}
.date-picker > div:first-child {
    @apply grow;
}
#result canvas {
    @apply max-w-full;
}
.selectable-card:hover > div {
    @apply visible;
}
.input-schedule {
    width: calc(100% - 48px);
}
.suggestions-container-focused {
    @apply ring-1 ring-navy-500
}

</style>