<script setup>
import { addDays, subDays, format, setDefaultOptions } from 'date-fns'
//@ts-ignore
import { th } from 'date-fns/locale/index.js'
import domtoimage from 'dom-to-image'

useSeoMeta({
  title: 'ตัวอย่างการ์ดเชิญงานศพ'
})

setDefaultOptions({ locale: th })

//@ts-ignore
import card1 from "../assets/img/frame-1.png";
//@ts-ignore
import card2 from "../assets/img/frame-2.png";
//@ts-ignore
import card3 from "../assets/img/frame-3.png";

const router = useRouter();
const route = useRoute();

const toast = useToast()
const url = useRequestURL()

const { loggedIn, user } = useUserSession()

const { isAuthModal, toggleAuthModal } = useLoginModal()

const sizing = ref(true)
const localData = ref({})
const imgCardData = ref('')
const imgFrameData = ref('')
const imgAvatarData = ref('')
const domReady = ref(false)
const shareUrl = ref('')

const convertThaiNumber = (text) => {
  text = text.replaceAll('0','๐')
  text = text.replaceAll('1','๑')
  text = text.replaceAll('2','๒')
  text = text.replaceAll('3','๓')
  text = text.replaceAll('4','๔')
  text = text.replaceAll('5','๕')
  text = text.replaceAll('6','๖')
  text = text.replaceAll('7','๗')
  text = text.replaceAll('8','๘')
  text = text.replaceAll('9','๙')
  return text
}

const convertThaiDate = (date) => {
  return 'วัน' + format(new Date(date), 'EEEE') + 'ที่ ' + convertThaiNumber(format(new Date(date), 'd MMMM')) + ' ' + convertThaiNumber(String(Math.abs(parseInt(format(new Date(date), 'yyy')) + 543)))
}

const ratio = ref(1)
const position = ref(0)

async function getRatio() {
  if ( window.outerWidth > 768 ) {
    ratio.value = await Math.min((window.outerWidth / 1920) - 0.05, 0.65)
  } else {
    ratio.value = 0.3
  }
  sizing.value = false
}

function getPosition() {
  const wrapper_width = document.getElementById('card-wrapper').offsetWidth
  const card_width = document.getElementById('card').offsetWidth
  position.value = Math.floor((wrapper_width * 0.5) - card_width * ratio.value * 0.5)
}

const isShareModalOpen = ref(false)
const isCompletedModalOpen = ref(false)

function openShareModal() {
  isShareModalOpen.value = true
}
function openCompletedModal() {
  isCompletedModalOpen.value = true
}

const domPreparing = ref(true)
const imgProcessing = ref(true)
const urlFetching = ref(false)
const cardSaving = ref(false)

async function getShareUrl() {
  if ( !shareUrl.value ) {
    urlFetching.value = true
    const response = await $fetch('/api/upload/', {
      method: 'post',
      body: {
        base64_image: imgCardData.value,
        filename: `inviation-card-${localData.value.cardId}.png`
      }
    })
    if ( response.attachment_url ) {
      shareUrl.value = response.attachment_url
      domPreparing.value = false
      urlFetching.value = false
      isShareModalOpen.value = true
    }
  } else {
    isShareModalOpen.value = true
  }
}

async function saveCard() {
  const response = await $fetch(`/api/card/${localData.value.cardId}`, {
    method: 'post',
    body: {
      title: `${localData.value.firstName} ${localData.value.lastName}`,
      status: 'publish',
      slug: String(localData.value.cardId),
      acf: {
        img_data: imgCardData.value,
        card_data: JSON.stringify(localData.value),
        owner_user_id: user.value.id.toString()
      }
    }
  })
  if (response.id) {
    removeCardSessionStorage()
    navigateTo('/invitation-card/saved-cards')
  }
}

function downloadFile() {
  setTimeout(() => {
    let link = document.createElement('a');
    link.download = `Carenation-Invitation-Card-${localData.value.cardId}.png`;
    link.href = imgCardData.value;
    link.click();
    toast.add({ title: 'ดาวน์โหลดสำเร็จ', icon:"i-heroicons-check" })
  }, 1000)
}

function removeCardSessionStorage() {
  sessionStorage.removeItem("carenation-invitation-card")
}

const getSelectedCardSrc = computed(() => {
  let result
  switch(localData.value.selectedCard) {
    case 1:
      result = card1
      break;
    case 2:
      result = card2
      break;
    case 3:
      result = card3
      break;
    default:
      result = card1
  }
  return result
})

const styledPostScript = computed(() => {
  const matched = /\r|\n/.exec(localData.value.postscript)
  return matched ? localData.value.postscript.replace(/\n/g, '<br>') : localData.value.postscript
})

const newSchedules = ref([])
const activeApm = ref(0)

watch(localData, (newValue) => {
  const newRange = Math.abs((new Date(newValue.selectedDates.start).getTime() - new Date(newValue.selectedDates.end).getTime()) / 86400000) + 1
  if (newValue.schedules) {
    newValue.schedules.forEach((item, index, arr) => {
      let date = []
      let num = 0
      activeApm.value = activeApm.value + item.appointment.length
      switch(index) {
        case 0:
          if ( newRange > 1 && newValue.schedules[1].sameAsDayBefore ) {
            date.push(new Date(newValue.selectedDates.start), subDays(new Date(newValue.selectedDates.end), 1))
          } else {
            date.push(new Date(newValue.selectedDates.start))
          }
          break;
        case 1:
          if ( newRange > 3 ) {
            date.push(addDays(new Date(newValue.selectedDates.start), 1), subDays(new Date(newValue.selectedDates.end), 1))
          } else {
            date.push(addDays(new Date(newValue.selectedDates.start), 1))
          }
          break;
        case 2:
          date.push(new Date(newValue.selectedDates.end))
          break;
        default:
          date.push(new Date())
      }
      newSchedules.value.push({ date: date, appointment: !item.sameAsDayBefore ? item.appointment : [], sameAsDayBefore: item.sameAsDayBefore })
    })
  }
})

watch(domReady, (newValue) => {
  if ( newValue === true ) {
    var card = document.getElementById('card')
    var t = card.style.transform
    var ml = card.style.marginLeft
    card.style.removeProperty('transform')
    card.style.removeProperty('margin-left')
    domtoimage.toPng(card).then(function (cardDataUrl) {
      card.style.transform = t
      card.style.marginLeft = ml
      imgCardData.value = cardDataUrl
      domPreparing.value = false
      imgProcessing.value = false
    })
  }
})

if (loggedIn.value && route.params.id) {
  domPreparing.value = true
  $fetch(`/api/card/${route.params.id}`, { method: 'get' }).then((response) => {
    if ( response.acf.owner_user_id === user.value.id.toString() ) {
      domPreparing.value = false
    }
  }).catch((error) => {
    navigateTo('/invitation-card/saved-cards')
  })  
}

onMounted(async () => {

  const cardData = JSON.parse(sessionStorage.getItem("carenation-invitation-card"));

  if ( !cardData.cardId ) {
    navigateTo('/invitation-card/edit')
  } else {
    localData.value = cardData
  }

  window.addEventListener("resize", function() {
    getRatio()
    getPosition()
  });
  getRatio()

  setTimeout(() => {
    getPosition()
  }, 1)

  var frame = document.getElementById('frame')
  domtoimage.toJpeg(frame).then(function (frameDataUrl) {
    imgFrameData.value = frameDataUrl
    var avatar = document.getElementById('avatar')
    if (avatar) {
      domtoimage.toJpeg(avatar).then(function (avatarDataUrl) {
        imgAvatarData.value = avatarDataUrl
        domReady.value = true
      })
    } else {
      domReady.value = true
    }
  })

})

</script>

<template>
    <div class="bg-grayscale-200 relative">
        <svg v-show="domPreparing" aria-hidden="true" class="inline w-10 h-10 fixed top-1/2 left-1/2 z-50 -mt-5 -ml-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <div class="size-full absolute left-0 top-0 bg-white transition-opacity duration-100 cursor-wait" :class="{ 'opacity-100 z-40': domPreparing, 'opacity-0 -z-10' : !domPreparing }"></div>
        <section class="pb-12 relative">
            <div class="container mx-auto relative z-20">
                <PageHeading title="สร้างการ์ดเชิญสำเร็จแล้ว" center />
                <div v-if="!loggedIn" class="w-full max-w-[513px] flex flex-col xs:flex-row justify-evenly items-center gap-y-2 mx-auto rounded-lg bg-white py-5">
                    <div>
                        บันทึกการ์ดเชิญฟรี
                    </div>
                    <div>
                        <ButtonPrimary label="สมัครสมาชิก / เข้าสู่ระบบ" @click="toggleAuthModal" />
                        <!-- <ModalAuth :isOpen="isAuthModal" /> -->
                    </div>
                </div>
            </div>
            <div id="card-wrapper" class="max-w-[970px] mx-auto mt-10 relative z-10 select-none" :class="{ 'hidden': sizing }">
              <NuxtImg src="/svg/flower.svg" width="486" height="650" class="absolute z-0 -left-[313px] -top-[197px]" />
              <img v-show="imgCardData" :src="imgCardData" class="relative z-10"/>
              <div v-show="!imgCardData" id="card" class="w-[1280px] h-[1812px] origin-top-left bg-white relative z-10 flex flex-col text-center" :class="`card-${localData.selectedCard}`" :style="`margin-left: ${position}px; transform: scale(${ratio});`">     
                <div class="flex-none flex flex-col justify-end relative z-10" :class="{'h-[25%]':!localData.avatarData,'h-[30%]':localData.avatarData}">
                  <div class="relative pb-7">
                    <div v-if="localData.avatarData" class="w-44 h-44 bg-grayscale-100 mx-auto rounded-full overflow-hidden outline outline-8 outline-[#fff9f2] relative z-10">
                      <div id="avatar">
                        <img class="w-full h-full" :src="localData.avatarData" />
                      </div>
                      <img v-if="imgAvatarData" :src="imgAvatarData" />
                    </div>
                    <img v-if="localData.selectedCard === 1 && localData.avatarData" src="~/assets/img/avatar-wreath.png" width="300" height="218" class="absolute -top-8 left-1/2 -ml-[150px]" />
                  </div>
                  <div>
                    <h4 class="font-medium text-3xl color-secondary">กำหนดการพิธีรดน้ำ สวดอภิธรรม และฌาปนกิจศพ</h4>
                    <h2 class="font-medium text-5xl color-primary my-7">{{ localData.firstName }} {{ localData.lastName }}</h2>
                    <h5 class="font-medium text-2xl color-secondary">{{ localData.location }}</h5>
                  </div>
                </div>
                <div class="w-full grow flex flex-col justify-center relative z-10">
                  <div class="w-full absolute top-7"><hr/></div>
                  <div class="space-y-12">
                    <div v-for="(schedule, index) in newSchedules" :key="index">
                      <div v-if="schedule.appointment.length > 0">
                        <h6 class="font-bold text-3xl color-primary" :class="{ 'text-xl' : activeApm > 12, 'text-2xl mb-5' : activeApm > 10, 'mb-7' : activeApm <= 10 }">
                          <!-- {{schedule.date}} -->
                          <span v-if="schedule.date.length > 1">
                            {{ convertThaiDate(schedule.date[0]) }} - {{ convertThaiDate(schedule.date[1]) }}
                          </span>
                          <span v-else>
                            {{ convertThaiDate(schedule.date[0]) }}
                          </span>
                        </h6>
                        <!-- <div v-if="schedule.sameAsDayBefore" class="color-secondary px-52 text-3xl" :class="{ 'text-xl' : activeApm > 12, 'text-2xl' : activeApm > 10 }">กำหนดการเหมือนวันแรก</div> -->
                        <!-- <div v-if="index === 1 && Math.floor((newSchedules[0].appointment.length*2)+newSchedules[2].appointment.length) > 12" class="color-secondary px-52 text-3xl" :class="{ 'text-xl' : activeApm > 12, 'text-2xl' : activeApm > 10 }">กำหนดการเหมือนวันแรก</div> -->
                        <ul :class="activeApm > 10 ? 'space-y-4' : 'space-y-7'">
                          <li v-for="(apm, i) in schedule.appointment" :key="i" class="flex gap-x-7 color-secondary px-52 text-3xl" :class="{ 'text-xl' : activeApm > 12, 'text-2xl' : activeApm > 10 }">
                            <div class="w-1/2 text-right">เวลา {{ convertThaiNumber(apm.hour) }} น.</div>
                            <div class="w-1/2 text-left">{{ apm.caption }}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="w-full absolute bottom-7"><hr/></div>
                </div>
                <div class="h-[14%] flex-none relative z-10">
                  <div class="text-2xl color-secondary leading-loose w-5/12 mx-auto">
                    <p v-if="localData.postscript" v-html="styledPostScript"></p>
                    <p v-else>จึงขอกราบเรียนเชิญทุกท่านด้วยความเคารพนับถือขออภัยหากไม่ได้มาเรียนเชิญด้วยตัวเอง</p>
                  </div>
                </div>
                <div id="frame" class="w-full h-full absolute top-0 left-0 z-0 bg-contain bg-center" :style="`background-image: url('${getSelectedCardSrc}')`"></div>
                <img v-if="imgFrameData" :src="imgFrameData" class="w-full h-full absolute top-0 left-0 -z-10" />
              </div>
            </div>
            <div class="py-7 text-center">
                <div v-if="$device.isIos && imgCardData || $device.isAndroid && imgData" class="font-medium text-navy-400 mb-6">กดค้างที่ภาพเพื่อทำการดาวน์โหลด</div>
                <div class="flex flex-wrap justify-center gap-3">
                    <ButtonSecondary label="แชร์" transparent icon="share" reverse @click="getShareUrl()" :loading="urlFetching" />
                    <ButtonSecondary v-if="!$device.isIos && !$device.isAndroid" label="ดาวน์โหลด" transparent icon="download" reverse @click="downloadFile()" :loading="imgProcessing" />
                    <ButtonSecondary v-if="loggedIn" label="บันทึก" transparent icon="checked" reverse @click="saveCard()" :loading="cardSaving" />
                    <ButtonSecondary v-else label="เสร็จสิ้น" transparent icon="checked" reverse @click="openCompletedModal()" />
                </div>
                <NuxtLink class="block font-semibold text-lg text-navy-700 mt-7 mx-auto" :to="route.params.id ? `/invitation-card/edit/${route.params.id}` : '/invitation-card/edit'">กลับไปแก้ไข</NuxtLink>
            </div>
        </section>
        <section class="pt-12 pb-20 bg-white">
            <div class="container mx-auto">
                <PageHeading title="บริการอื่นๆ" center />
                <div class="flex flex-col sm:flex-row gap-7 items-center">
                    <div class="w-full sm:w-1/2">
                        <img class="max-w-full w-[520px] h-[346px] bg-grayscale-200 mx-auto object-cover" src="/img/altar.jpg" />
                    </div>
                    <div class="w-full sm:w-1/2">
                        <h5 class="text-xl sm:text-3xl text-navy-700 mb-7">ขั้นตอนการจัดงานศพ</h5>
                        <p class="font-medium text-sm sm:text-lg text-grayscale-700">ดูเช็คลิสต์ขั้นตอนการจัดงานศพ เพื่อส่งคนที่เรารักครั้งสุดท้าย</p>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10 sm:mt-14">
                            <div>
                                <ButtonPrimary label="พิธีพุทธแบบไทย" size="large" block href="https://care-nation.com/funeral-checklist/thai-buddhist" />
                            </div>
                            <div>
                                <ButtonSecondary label="พิธีพุทธแบบจีน" size="large" block href="https://care-nation.com/funeral-checklist/chinese-buddhist" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <ModalShare :isOpen="isShareModalOpen" @close="isShareModalOpen = false" :url="shareUrl" />

        <UModal v-model="isCompletedModalOpen">
            <div class="flex flex-col gap-y-2 pb-14">
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-white cursor-pointer" @click="isCompletedModalOpen = false">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="text-center bg-white p-7 divide-y divide-grayscale-300">
                  <header class="pb-4">
                    <h4 class="font-medium text-2xl text-navy-700">การสร้างการ์ดเชิญเสร็จสิ้น</h4>
                  </header>
                  <main>
                    <div class="py-7">
                      <p class="text-navy-700">เมื่อกลับสู่หน้าหลักแล้วจะไม่สามารถย้อนกลับมาได้อีก<br/>กรุณาดาวน์โหลดการ์ดเชิญงานศพให้เรียบร้อย</p>
                    </div>
                    <div class="space-x-1 space-y-3">
                      <ButtonSecondary label="ย้อนกลับ" size="medium" @click="isCompletedModalOpen = false"/>
                      <ButtonPrimary label="กลับสู่หน้าหลัก" size="medium" href="/invitation-card" @click="removeCardSessionStorage" />
                    </div>
                  </main>
                </div>
            </div>
        </UModal>

    </div>
</template>

<style scoped>
.card-1 .color-primary {
  color: #233763;
}
.card-1 .color-secondary {
  color: #505E7E;
}
.card-2 .color-primary {
  color: #658498;
}
.card-2 .color-secondary {
  color: #758ca5;
}
.card-3 .color-primary {
  color: #fffaea;
}
.card-3 .color-secondary {
  color: #e7e2d3;
}
hr {
  @apply block mx-auto bg-contain bg-center bg-no-repeat border-0;
}
.card-1 hr {
  height: 21px;
  background-image: url('~/assets/img/sep-1.png');
}
.card-2 hr {
  width: 819px;
  height: 7px;
  background-image: url('~/assets/img/sep-2.png');
}
.card-3 hr {
  width: 143px;
  height: 67px;
  background-image: url('~/assets/img/sep-3.png');
}
</style>