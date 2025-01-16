<template>
  <div>
    <div class="py-8 flex gap-x-8">
      <div>
        <div class="w-[120px] h-[120px] rounded-full bg-[#c4c4c4] overflow-hidden flex justify-center items-center ring-1 ring-grayscale-300">
          <img v-if="cropSuccess || initialImgUrl" :src="createImgUrl ? createImgUrl : initialImgUrl" />
          <svg class="w-11 h-11 fill-grayscale-300" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.4828 5.70696C25.5647 5.70696 28.0862 8.22851 28.0862 11.3104C28.0862 14.3923 25.5647 16.9139 22.4828 16.9139C19.4009 16.9139 16.8793 14.3923 16.8793 11.3104C16.8793 8.22851 19.4009 5.70696 22.4828 5.70696ZM22.4828 33.7242C30.0474 33.7242 38.7328 37.3384 39.2931 39.3277H5.67242C6.31681 37.3104 14.9461 33.7242 22.4828 33.7242ZM22.4828 0.103516C16.291 0.103516 11.2759 5.1186 11.2759 11.3104C11.2759 17.5022 16.291 22.5173 22.4828 22.5173C28.6746 22.5173 33.6897 17.5022 33.6897 11.3104C33.6897 5.1186 28.6746 0.103516 22.4828 0.103516ZM22.4828 28.1208C15.0022 28.1208 0.0689697 31.8751 0.0689697 39.3277V44.9311H44.8966V39.3277C44.8966 31.8751 29.9634 28.1208 22.4828 28.1208Z" fill="#E0E0E0"/>
          </svg>
        </div>
      </div>
      <div class="space-y-3">
        <div class="font-medium text-lg text-navy-700">รูปภาพผู้วายชนม์ <span class="text-grayscale-600">(ถ้ามี)</span></div>
        <div>
          <div class="flex flex-col xs:flex-row items-start xs:items-center gap-3">
            <UButton size="lg" :ui="{ rounded: 'rounded-full' }" @click="handleClick" :disabled="fileSelecting">เลือกรูป</UButton>
            <input type="file" accept="image/*" v-show="false" @change="handleChange" ref="fileinput">
            <div class="text-[13px] text-grayscale-700">
              <span v-if="cropSuccess && sourceImgData">{{ sourceImgData.name }}</span>
              <span v-if="!initialImgUrl">ยังไม่ได้เลือกรูป</span>
            </div>
          </div>
          <div v-if="!initialImgUrl" class="text-[13px] text-grayscale-400 mt-2">ขนาดไฟล์ไม่เกิน 5 MB.</div>
        </div>
        <div v-show="hasError" class="text-[13px] text-red-500">{{ errorMsg }}</div>
      </div>
    </div>
    <UModal v-model="isModalOpen" :ui="{ width: 'w-full sm:max-w-max' }">
      <div class="p-4 flex flex-col gap-y-2">
        <div class="flex justify-end">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7 fill-white cursor-pointer" @click="off">
				<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
			</svg>
        </div>
        <div class="vue-image-crop-upload px-3 py-10 xs:p-10 bg-white" v-show="modelValue">
          <div class="vicp-wrap">
            <div class="vicp-step2" v-if="step == 2">
              <div class="vicp-crop">
                <div class="vicp-crop-left space-y-6" v-show="true">
                  <h4 class="font-noto font-medium text-3xl text-navy-700 text-center">แก้ไขรูปภาพ</h4>
                  <div ref="crop" class="bg-navy-700/70 py-10" :style="cropWidth < 444 ? `height: 320px` : ``">
                  	<div class="w-[444px] h-[364px] overflow-hidden relative" :style="cropWidth < 444 ? `transform: scale(0.5); -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -webkit-transform-origin: left; -moz-transform-origin: left; transform-origin: left; left: ${(cropWidth - 222)/2}px; top: -60px` : ``">
                  		<div class="vicp-img-container mx-auto" @wheel.prevent="handleMouseWheel">
		                    <img :src="sourceImgUrl" :style="sourceImgStyle" class="vicp-img" draggable="false"
		                      @drag="preventDefault"
		                      @dragstart="preventDefault"
		                      @dragend="preventDefault"
		                      @dragleave="preventDefault"
		                      @dragover="preventDefault"
		                      @dragenter="preventDefault"
		                      @drop="preventDefault"
		                      @touchstart="imgStartMove"
		                      @touchmove="imgMove"
		                      @touchend="createImg"
		                      @touchcancel="createImg"
		                      @mousedown="imgStartMove"
		                      @mousemove="imgMove"
		                      @mouseup="createImg"
		                      @mouseout="createImg"
		                      ref="img">
		                    <div class="vicp-img-shade vicp-img-shade-1 bg-navy-700/80" :style="sourceImgShadeStyle"></div>
		                    <div class="vicp-img-shade vicp-img-shade-2 bg-navy-700/80" :style="sourceImgShadeStyle"></div>
                  	</div>
	                  </div>
                  </div>
                  <div class="flex justify-center items-center gap-x-1">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 stroke-grayscale-600">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
					</svg>
					<!-- <input type="range" v-model="scale.range" step="1" min="0" max="100" @touchmove="zoomChange"> -->
                    <URange :model-value="parseInt(scale.range)" :min="0" :max="100" size="sm" :ui="{ wrapper: 'w-[272px]' }" @mousemove="zoomChange" @touchmove="zoomChange" />
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 stroke-grayscale-600">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
                  </div>
                  <div class="flex justify-center gap-x-3">
                    <ButtonSecondary size="small" label="ยกเลิก" @click="off" />
                    <ButtonPrimary size="small" label="บันทึก" @click="prepareUpload" />
                  </div>
                </div>
              </div>
            </div>
            <canvas v-show="false" :width="width" :height="height" ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script>
'use strict';
import { useElementSize } from '@vueuse/core'
// import language from './utils/language.js';
// import mimes from './utils/mimes.js';
// import data2blob from './utils/data2blob.js';
// import effectRipple from './utils/effectRipple.js';

const crop = ref(null)

const mimes = ref({
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'psd': 'image/photoshop'
})

function data2blob(data, mime) {
	data = data.split(',')[1];
	data = window.atob(data);
	var ia = new Uint8Array(data.length);
	for (var i = 0; i < data.length; i++) {
		ia[i] = data.charCodeAt(i);
	};
	// canvas.toDataURL 返回的默认格式就是 image/png
	return new Blob([ia], {
		type: mime
	});
};

export default {
	props: {
		// 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		field: {
			type: String,
			default: 'avatar'
		},
		// 原名key，类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		ki: {
			type: String,
			default: '0'
		},
		// 显示该控件与否
		modelValue: {
			type: Boolean,
			default: true
		},
		// 上传地址
		url: {
			type: String,
			default: ''
		},
		// 其他要上传文件附带的数据，对象格式
		params: {
			type: Object,
			default: ()=>null
		},
		//Add custom headers
		headers: {
			type: Object,
			default: ()=>null
		},
		// 剪裁图片的宽
		width: {
			type: Number,
			default: 200
		},
		// 剪裁图片的高
		height: {
			type: Number,
			default: 200
		},
		// 不显示旋转功能
		noRotate: {
			type: Boolean,
			default: true
		},
		// 不预览圆形图片
		noCircle: {
			type: Boolean,
			default: false
		},
		// 不预览方形图片
		noSquare: {
			type: Boolean,
			default: false
		},
		// 单文件大小限制
		maxSize: {
			type: Number,
			default: 5120
		},
		// 语言类型
		langType: {
			type: String,
			default: 'zh'
		},
		// 语言包
		langExt: {
			type: Object,
			default: ()=>null
		},
		// 图片上传格式
		imgFormat: {
			type: String,
			default: 'png'
		},
		// 图片背景 jpg情况下生效
		imgBgc: {
			type: String,
			default: '#fff'
		},
		// 是否支持跨域
		withCredentials: {
			type: Boolean,
			default: false
		},
		method: {
			type: String,
			default: 'POST'
		},
		initialImgUrl: {
			type: String,
			default: ''
	    },
	    allowImgFormat: {
	    	type: Array,
	    	default: ()=>[
		    	'gif',
			'jpg',
			'png'
			]
	    }
	},

	data() {
		let that = this,
			{
				imgFormat,
				allowImgFormat,
				langType,
				langExt,
				width,
				height
			} = that,
			isSupported = true,
			tempImgFormat = allowImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat,
			// lang = language[langType] ? language[langType] : language['en'],
			mime = mimes[tempImgFormat];
		// 规范图片格式
		// that.imgFormat = tempImgFormat;

		// if (langExt) {
		// 	Object.assign(lang, langExt);
		// }
		if (typeof FormData != 'function') {
			isSupported = false;
		}
		return {
			// 图片的mime
			mime,

			// 语言包
			// lang,

			// 浏览器是否支持该控件
			isSupported,
			// 浏览器是否支持触屏事件
			isSupportTouch: document.hasOwnProperty("ontouchstart"),

			// 步骤
			step: 1, //1选择文件 2剪裁 3上传

			// 上传状态及进度
			loading: 0, //0未开始 1正在 2成功 3错误
			progress: 0,
      		isModalOpen: false,
      		cropSuccess: false,
			fileSelecting: false,

			// 是否有错误及错误信息
			hasError: false,
			errorMsg: '',

			// 需求图宽高比
			ratio: width / height,

			// 原图地址、生成图片地址
			sourceImg: null,
      		sourceImgData: null,
			sourceImgUrl: this.initialImgUrl,
			createImgUrl: this.initialImgUrl,

			// 原图片拖动事件初始值
			sourceImgMouseDown: {
				on: false,
				mX: 0, //鼠标按下的坐标
				mY: 0,
				x: 0, //scale原图坐标
				y: 0
			},

			// 生成图片预览的容器大小
			previewContainer: {
				width: 100,
				height: 100
			},

			// 原图容器宽高
			sourceImgContainer: { // sic
				width: 444,
				height: 364 // 如果生成图比例与此一致会出现bug，先改成特殊的格式吧，哈哈哈
			},

			// 原图展示属性
			scale: {
				zoomAddOn: false, //按钮缩放事件开启
				zoomSubOn: false, //按钮缩放事件开启
				range: 1, //最大100

				x: 0,
				y: 0,
				width: 0,
				height: 0,
				maxWidth: 0,
				maxHeight: 0,
				minWidth: 0, //最宽
				minHeight: 0,
				naturalWidth: 0, //原宽
				naturalHeight: 0
			}
		}
	},

	computed: {
		// 进度条样式
		progressStyle() {
			let {
				progress
			} = this;
			return {
				width: progress + '%'
			}
		},
		// 原图样式
		sourceImgStyle() {
			let {
					scale,
					sourceImgMasking
				} = this,
				top = scale.y + sourceImgMasking.y + 'px',
				left = scale.x + sourceImgMasking.x + 'px';
			return {
				top,
				left,
				width: scale.width + 'px',
				height: scale.height + 'px',// 兼容 Opera
			}
		},
		// 原图蒙版属性
		sourceImgMasking() {
			let {
					width,
					height,
					ratio,
					sourceImgContainer
				} = this,
				sic = sourceImgContainer,
				sicRatio = sic.width / sic.height, // 原图容器宽高比
				x = 0,
				y = 0,
				w = sic.width,
				h = sic.height,
				scale = 1;
			if (ratio < sicRatio) {
				scale = sic.height / height;
				w = sic.height * ratio;
				x = (sic.width - w) / 2;
			}
			if (ratio > sicRatio) {
				scale = sic.width / width;
				h = sic.width / ratio;
				y = (sic.height - h) / 2;
			}
			return {
				scale, // 蒙版相对需求宽高的缩放
				x,
				y,
				width: w,
				height: h
			};
		},
		// 原图遮罩样式
		sourceImgShadeStyle() {
			let {
					sourceImgMasking,
					sourceImgContainer
				} = this,
				sic = sourceImgContainer,
				sim = sourceImgMasking,
				w = sim.width == sic.width ? sim.width : (sic.width - sim.width) / 2,
				h = sim.height == sic.height ? sim.height : (sic.height - sim.height) / 2;
			return {
				width: w + 'px',
				height: h + 'px'
			};
		},
		previewStyle() {
			let {
					width,
					height,
					ratio,
					previewContainer
				} = this,
				pc = previewContainer,
				w = pc.width,
				h = pc.height,
				pcRatio = w / h;
			if (ratio < pcRatio) {
				w = pc.height * ratio;
			}
			if (ratio > pcRatio) {
				h = pc.width / ratio;
			}
			return {
				width: w + 'px',
				height: h + 'px'
			};
		}
	},

	watch: {
		// modelValue(newValue) {
		// 	if (newValue && this.loading != 1) {
		// 		this.reset();
		// 	}
		// }
	},

	setup() {
		const crop = ref(null)
		const { width, height } = useElementSize(crop)
		const cropWidth = width
		const cropHeight = height

		return {
			crop,
			cropWidth,
			cropHeight,
		}
	},

	created(){
		// 绑定按键esc隐藏此插件事件
		document.addEventListener('keyup', this.handleEscClose )
	},

	beforeUnmount(){
		document.removeEventListener('keyup', this.handleEscClose )
	},

	mounted() {
		if (this.sourceImgUrl) {
			this.startCrop();
		}
	},

	methods: {
		handleEscClose(e){
			if(this.modelValue && (e.key == 'Escape' || e.keyCode == 27)){
				this.off();
			}
		},
		// 点击波纹效果
		// ripple(e) {
		// 	effectRipple(e);
		// },
		// 关闭控件
		off() {
      this.createImgUrl = null
      this.sourceImg = null
      this.sourceImgData = null
      this.cropSuccess = false
      this.reset()
      this.isModalOpen = false
			// setTimeout(()=> {
			// 	this.$emit('update:modelValue', false);
			// 	if(this.step == 3 && this.loading == 2){
			// 		this.setStep(1);
			// 	}
			// }, 200);
		},
		// 设置步骤
		setStep(no) {
			// 延时是为了显示动画效果呢，哈哈哈
			setTimeout(()=> {
				this.step = no;
			}, 200);
		},

		/* 图片选择区域函数绑定
		 ---------------------------------------------------------------*/
		preventDefault(e) {
			e.preventDefault();
			return false;
		},
		handleClick(e) {
			this.fileSelecting = true
			if (this.loading !== 1) {
				if (e.target !== this.$refs.fileinput) {
					e.preventDefault();
					if (document.activeElement !== this.$refs) {
						this.$refs.fileinput.click();
					}
				}
			}
			setTimeout(() => {
				this.fileSelecting = false
			}, 500);
		},
		handleChange(e) {
			e.preventDefault();
      		this.reset();
			if (e.target.files.length && this.loading !== 1) {
				let files = e.target.files || e.dataTransfer.files;
				if (this.checkFile(files[0])) {
					this.setSourceImg(files[0]);
          			this.isModalOpen = true
          			this.sourceImgData = files[0]
				} else {
          			this.isModalOpen = false
        		}
			}
		},
		/* ---------------------------------------------------------------*/

		// 检测选择的文件是否合适
		checkFile(file) {
			let that = this,
				{
					// lang,
					maxSize
				} = that;
			// 仅限图片
			if (file.type.indexOf('image') === -1) {
				that.hasError = true;
				that.errorMsg = 'กรุณาเลือกไฟล์รูปภาพเท่านั้น';
				return false;
			}

			// 超出大小
			if (file.size / 1024 > maxSize) {
				that.hasError = true;
				that.errorMsg = 'ขนาดไฟล์รูปภาพที่เลือกมีขนาดเกิน 5 MB.';
				return false;
			}
			return true;
		},
		// 重置控件
		reset() {
			let that = this;
			that.loading = 0;
			that.hasError = false;
			that.errorMsg = '';
			that.progress = 0;
		},
		// 设置图片源
		setSourceImg(file) {
			this.$emit('src-file-set', file.name, file.type, file.size);
			let that = this,
				fr = new FileReader();
			fr.onload = function(e) {
				that.sourceImgUrl = fr.result;
				that.startCrop();
			}
			fr.readAsDataURL(file);
		},
		// 剪裁前准备工作
		startCrop() {
			let that = this,
				{
					width,
					height,
					ratio,
					scale,
					sourceImgUrl,
					sourceImgMasking,
					// lang
				} = that,
				sim = sourceImgMasking,
				img = new Image();
			img.src = sourceImgUrl;
			img.onload = function() {
				let nWidth = img.naturalWidth,
					nHeight = img.naturalHeight,
					nRatio = nWidth / nHeight,
					w = sim.width,
					h = sim.height,
					x = 0,
					y = 0;
				// 图片像素不达标
				if (nWidth < width || nHeight < height) {
					that.hasError = true;
					that.errorMsg = 'Image\'s size is too low. Expected at least: ' + width + '*' + height;
					return false;
				}
				if (ratio > nRatio) {
					h = w / nRatio;
					y = (sim.height - h) / 2;
				}
				if (ratio < nRatio) {
					w = h * nRatio;
					x = (sim.width - w) / 2;
				}
				scale.range = 0;
				scale.x = x;
				scale.y = y;
				scale.width = w;
				scale.height = h;
				scale.minWidth = w;
				scale.minHeight = h;
				scale.maxWidth = nWidth * sim.scale;
				scale.maxHeight = nHeight * sim.scale;
				scale.naturalWidth = nWidth;
				scale.naturalHeight = nHeight;
				that.sourceImg = img;
				that.createImg();
				that.setStep(2);
			};
		},
		// 鼠标按下图片准备移动
		imgStartMove(e) {
			e.preventDefault();
			// 支持触摸事件，则鼠标事件无效
			if(this.isSupportTouch && !e.targetTouches){
				return false;
			}
			let et = e.targetTouches ? e.targetTouches[0] : e,
				{
					sourceImgMouseDown,
					scale
				} = this,
				simd = sourceImgMouseDown;
			simd.mX = et.screenX;
			simd.mY = et.screenY;
			simd.x = scale.x;
			simd.y = scale.y;
			simd.on = true;
		},
		// 鼠标按下状态下移动，图片移动
		imgMove(e) {
			e.preventDefault();
			// 支持触摸事件，则鼠标事件无效
			if(this.isSupportTouch && !e.targetTouches){
				return false;
			}
			let et = e.targetTouches ? e.targetTouches[0] : e,
				{
					sourceImgMouseDown: {
						on,
						mX,
						mY,
						x,
						y
					},
					scale,
					sourceImgMasking
				} = this,
				sim = sourceImgMasking,
				nX = et.screenX,
				nY = et.screenY,
				dX = nX - mX,
				dY = nY - mY,
				rX = x + dX,
				rY = y + dY;
			if (!on) return;
			if (rX > 0) {
				rX = 0;
			}
			if (rY > 0) {
				rY = 0;
			}
			if (rX < sim.width - scale.width) {
				rX = sim.width - scale.width;
			}
			if (rY < sim.height - scale.height) {
				rY = sim.height - scale.height;
			}
			scale.x = rX;
			scale.y = rY;
		},
		// 顺时针旋转图片
        rotateImg(e) {
			let {
					sourceImg,
                    scale: {
						naturalWidth,
						naturalHeight,
                    }
                } = this,
				width = naturalHeight,
				height = naturalWidth,
                canvas = this.$refs.canvas,
                ctx = canvas.getContext('2d');
			canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, width, height);

			ctx.fillStyle = 'rgba(0,0,0,0)';
			ctx.fillRect(0, 0, width, height);

			ctx.translate(width, 0);
            ctx.rotate(Math.PI * 90 / 180);

            ctx.drawImage(sourceImg, 0, 0, naturalWidth, naturalHeight);
            let imgUrl = canvas.toDataURL(mimes['png']);

			this.sourceImgUrl = imgUrl;
			this.startCrop();
        },
        handleMouseWheel(e){
			e = e || window.event;
			let 	{ scale } = this;
			if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
				if (e.wheelDelta > 0) { //当滑轮向上滚动时
					this.zoomImg(scale.range >= 100 ? 100 : ++scale.range);
				}
				if (e.wheelDelta < 0) {
					this.zoomImg(scale.range <= 0 ? 0 : --scale.range);
				}
			} else if (e.detail) {  //Firefox滑轮事件
				if (e.detail > 0) { //当滑轮向上滚动时
					this.zoomImg(scale.range >= 100 ? 100 : ++scale.range);
				}
				if (e.detail < 0) {
					this.zoomImg(scale.range <= 0 ? 0 : --scale.range);
				}
			}
        },
		// 按钮按下开始放大
		startZoomAdd(e) {
			let that = this,
				{
					scale
				} = that;
			scale.zoomAddOn = true;

			function zoom() {
				if (scale.zoomAddOn) {
					let range = scale.range >= 100 ? 100 : ++scale.range;
					that.zoomImg(range);
					setTimeout(function() {
						zoom();
					}, 60);
				}
			}
			zoom();
		},
		// 按钮松开或移开取消放大
		endZoomAdd(e) {
			this.scale.zoomAddOn = false;
		},
		// 按钮按下开始缩小
		startZoomSub(e) {
			let that = this,
				{
					scale
				} = that;
			scale.zoomSubOn = true;

			function zoom() {
				if (scale.zoomSubOn) {
					let range = scale.range <= 0 ? 0 : --scale.range;
					that.zoomImg(range);
					setTimeout(function() {
						zoom();
					}, 60);
				}
			}
			zoom();
		},
		// 按钮松开或移开取消缩小
		endZoomSub(e) {
			let {
				scale
			} = this;
			scale.zoomSubOn = false;
		},
		zoomChange(e) {
			this.zoomImg(e.target.value);
		},
		// 缩放原图
		zoomImg(newRange) {
			let that = this,
				{
					sourceImgMasking,
					sourceImgMouseDown,
					scale
				} = this,
				{
					maxWidth,
					maxHeight,
					minWidth,
					minHeight,
					width,
					height,
					x,
					y,
					range
				} = scale,
				sim = sourceImgMasking,
				// 蒙版宽高
				sWidth = sim.width,
				sHeight = sim.height,
				// 新宽高
				nWidth = minWidth + (maxWidth - minWidth) * newRange / 100,
				nHeight = minHeight + (maxHeight - minHeight) * newRange / 100,
				// 新坐标（根据蒙版中心点缩放）
				nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x),
				nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y);

			// 判断新坐标是否超过蒙版限制
			if (nX > 0) {
				nX = 0;
			}
			if (nY > 0) {
				nY = 0;
			}
			if (nX < sWidth - nWidth) {
				nX = sWidth - nWidth;
			}
			if (nY < sHeight - nHeight) {
				nY = sHeight - nHeight;
			}

			// 赋值处理
			scale.x = nX;
			scale.y = nY;
			scale.width = nWidth;
			scale.height = nHeight;
			scale.range = newRange;
			setTimeout(function() {
				if (scale.range == newRange) {
					that.createImg();
				}
			}, 300);
		},
		 // 生成需求图片
        createImg(e) {
            let that = this,
                {
					imgFormat,
					imgBgc,
                    mime,
                    sourceImg,
                    scale: {
                        x,
                        y,
                        width,
                        height,
                    },
                    sourceImgMasking: {
                        scale
                    }
                } = that,
                canvas = that.$refs.canvas,
                ctx = canvas.getContext('2d');
            if (e) {
                // 取消鼠标按下移动状态
                that.sourceImgMouseDown.on = false;
            }
			canvas.width = that.width;
            canvas.height = that.height;
            ctx.clearRect(0, 0, that.width, that.height);

			if(imgFormat == 'png'){
				ctx.fillStyle = 'rgba(0,0,0,0)';
			} else{
				// 如果jpg 为透明区域设置背景，默认白色
				ctx.fillStyle = imgBgc;
			}
			ctx.fillRect(0, 0, that.width, that.height);

            ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale);
            that.createImgUrl = canvas.toDataURL(mime);
        },
		prepareUpload(){
			let {
				url,
				createImgUrl,
				field,
				ki
			} = this;
			this.$emit('crop-success', createImgUrl, field, ki);
			if(typeof url == 'string' && url){
				this.upload();
			}else{
				this.cropSuccess = true
        		this.isModalOpen = false
			}
		},
		// 上传图片
		upload() {
			let that = this,
				{
					// lang,
					imgFormat,
					mime,
					url,
					params,
					headers,
					field,
					ki,
					createImgUrl,
					withCredentials,
					method
				} = this,
				fmData = new FormData();

			// 添加其他参数
			if (typeof params == 'object' && params) {
				Object.keys(params).forEach((k) => {
					fmData.append(k, params[k]);
				})
			}

			// 将field的添加放到表单域的最后，以支持阿里云OSS的表单上传
			fmData.append(field, data2blob(createImgUrl, mime), field + '.' + imgFormat);


			// 监听进度回调
			const uploadProgress = function(event) {
				if (event.lengthComputable) {
					that.progress = 100 * Math.round(event.loaded) / event.total;
				}
			};

			// 上传文件
			that.reset();
			that.loading = 1;
			that.setStep(3);
			new Promise(function(resolve, reject) {
				let client = new XMLHttpRequest();
				client.open(method, url, true);
				client.withCredentials = withCredentials;
				client.onreadystatechange = function() {
					if (this.readyState !== 4) {
						return;
					}
					if (this.status === 200 || this.status === 201 || this.staus ===202 ) {
						resolve(JSON.parse(this.responseText));
					} else {
						reject(this.status);
					}
				};
				client.upload.addEventListener("progress", uploadProgress, false); //监听进度
				// 设置header
				if (typeof headers == 'object' && headers) {
					Object.keys(headers).forEach((k) => {
						client.setRequestHeader(k, headers[k]);
					})
				}
				client.send(fmData);
			}).then(
				// 上传成功
				function(resData) {
					if (that.modelValue) {
						that.loading = 2;
						that.$emit('crop-upload-success', resData, field, ki);
            console.log('upload successful')
					}
				},
				// 上传失败
				function(sts) {
					if (that.modelValue) {
						that.loading = 3;
						that.hasError = true;
						// that.errorMsg = lang.fail;
						that.$emit('crop-upload-fail', sts, field, ki);
            console.log('upload failed')
					}
				}
			);
		}
	},
}

</script>

<style>
@charset "UTF-8";
@-webkit-keyframes vicp_progress {
  0% {
    background-position-y: 0; }
  100% {
    background-position-y: 40px; } }
@keyframes vicp_progress {
  0% {
    background-position-y: 0; }
  100% {
    background-position-y: 40px; } }

@-webkit-keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); } }

@keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); } }

.vue-image-crop-upload {
  /* position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;  */
  }
  .vue-image-crop-upload .vicp-wrap {
    /* -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    position: fixed;
    display: block;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    z-index: 10000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 600px;
    height: 330px;
    padding: 25px;
    background-color: #fff;
    border-radius: 2px;
    -webkit-animation: vicp 0.12s ease-in;
            animation: vicp 0.12s ease-in;  */
          }
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop {
      /* overflow: hidden;  */
    }
      .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left {
        /* float: left;  */
      }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container {
          position: relative;
          display: block;
          width: 444px;
          height: 364px;
          background-color: #e5e5e0;
          overflow: hidden !important; }
			/* @media only screen and (max-width: 600px) {
				.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container {
					transform: scale(0.5);
					transform-origin: left;
				}
			} */
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img {
            position: absolute;
            display: block;
            cursor: move;
            max-width: none;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade {
            /* -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18); */
            position: absolute;
            /* background-color: rgba(241, 242, 243, 0.8);  */
		}
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-1 {
              top: 0;
              left: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-2 {
              bottom: 0;
              right: 0; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate {
          position: relative;
          width: 240px;
          height: 18px; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i {
            display: block;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            background-color: rgba(0, 0, 0, 0.08);
            color: #fff;
            overflow: hidden; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:hover {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.14); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:first-child {
              float: left; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:last-child {
              float: right; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range {
          position: relative;
          width: 240px;
          height: 18px; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5,
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {
            position: absolute;
            top: 0;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            background-color: rgba(0, 0, 0, 0.08); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5:hover,
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:hover {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.14); }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5 {
            left: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5::before {
              position: absolute;
              content: '';
              display: block;
              left: 3px;
              top: 8px;
              width: 12px;
              height: 2px;
              background-color: #fff; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {
            right: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::before {
              position: absolute;
              content: '';
              display: block;
              left: 3px;
              top: 8px;
              width: 12px;
              height: 2px;
              background-color: #fff; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::after {
              position: absolute;
              content: '';
              display: block;
              top: 3px;
              left: 8px;
              width: 2px;
              height: 12px;
              background-color: #fff; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range] {
            display: block;
            padding-top: 5px;
            margin: 0 auto;
            width: 180px;
            height: 8px;
            vertical-align: top;
            background: transparent;
            -webkit-appearance: none;
               -moz-appearance: none;
                    appearance: none;
            cursor: pointer;
            /* 滑块
							 ---------------------------------------------------------------*/
            /* 轨道
							 ---------------------------------------------------------------*/ }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus {
              outline: none; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-thumb {
              -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
                      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              -webkit-appearance: none;
                      appearance: none;
              margin-top: -3px;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border-radius: 100%;
              border: none;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-thumb {
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              -moz-appearance: none;
                   appearance: none;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border-radius: 100%;
              border: none;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-thumb {
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              appearance: none;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border: none;
              border-radius: 100%;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-moz-range-thumb {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-ms-thumb {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-webkit-slider-thumb {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              margin-top: -4px;
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-runnable-track {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              height: 6px;
              cursor: pointer;
              border-radius: 2px;
              border: none;
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-track {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              height: 6px;
              cursor: pointer;
              border-radius: 2px;
              border: none;
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-track {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              cursor: pointer;
              background: transparent;
              border-color: transparent;
              color: transparent;
              height: 6px;
              border-radius: 2px;
              border: none; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-lower {
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-upper {
              background-color: rgba(68, 170, 119, 0.15); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-webkit-slider-runnable-track {
              background-color: rgba(68, 170, 119, 0.5); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-moz-range-track {
              background-color: rgba(68, 170, 119, 0.5); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-lower {
              background-color: rgba(68, 170, 119, 0.45); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-upper {
              background-color: rgba(68, 170, 119, 0.25); }
      .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {
        float: right; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview {
          height: 150px;
          overflow: hidden; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item {
            position: relative;
            padding: 5px;
            width: 100px;
            height: 100px;
            float: left;
            margin-right: 16px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span {
              position: absolute;
              bottom: -30px;
              width: 100%;
              font-size: 14px;
              color: #bbb;
              display: block;
              text-align: center; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item img {
              position: absolute;
              display: block;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              padding: 3px;
              background-color: #fff;
              border: 1px solid rgba(0, 0, 0, 0.15);
              overflow: hidden;
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle {
              margin-right: 0; }
              .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle img {
                border-radius: 100%; }
    
    .vue-image-crop-upload .vicp-wrap .vicp-operate {
      margin: 0 auto;
      /* position: absolute;
      right: 20px;
      bottom: 20px;  */
    }
      .vue-image-crop-upload .vicp-wrap .vicp-operate a {
        position: relative;
        /* float: left; */
        display: block;
        margin-left: 10px;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #4a7;
        border-radius: 2px;
        overflow: hidden;
        -webkit-user-select: none;
           -moz-user-select: none;
            -ms-user-select: none;
                user-select: none; }
        .vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {
          background-color: rgba(0, 0, 0, 0.03); }
    .vue-image-crop-upload .vicp-wrap .vicp-error,
    .vue-image-crop-upload .vicp-wrap .vicp-success {
      display: block;
      font-size: 14px;
      line-height: 24px;
      height: 24px;
      color: #d10;
      text-align: center;
      vertical-align: top; }
    .vue-image-crop-upload .vicp-wrap .vicp-success {
      color: #4a7; }
    .vue-image-crop-upload .vicp-wrap .vicp-icon3 {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      top: 4px; }
      .vue-image-crop-upload .vicp-wrap .vicp-icon3::after {
        position: absolute;
        top: 3px;
        left: 6px;
        width: 6px;
        height: 10px;
        border-width: 0 2px 2px 0;
        border-color: #4a7;
        border-style: solid;
        -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                transform: rotate(45deg);
        content: ''; }
    .vue-image-crop-upload .vicp-wrap .vicp-icon2 {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      top: 4px; }
      .vue-image-crop-upload .vicp-wrap .vicp-icon2::after, .vue-image-crop-upload .vicp-wrap .vicp-icon2::before {
        content: '';
        position: absolute;
        top: 9px;
        left: 4px;
        width: 13px;
        height: 2px;
        background-color: #d10;
        -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                transform: rotate(45deg); }
      .vue-image-crop-upload .vicp-wrap .vicp-icon2::after {
        -webkit-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
                transform: rotate(-45deg); }

</style>