import type { App, Plugin } from 'vue'

// 把路径转换成驼峰命名
export const pathToCamel = (path: string): string => {
	return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
}

// 是否外链
export const isExternalLink = (url: string): boolean => {
	return /^(https?:|\/\/|http?:|\/\/|^{{\s?apiUrl\s?}})/.test(url)
}

// 转换文件大小格式
export const convertSizeFormat = (size: number): string => {
	const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
	let index = Math.floor(Math.log(size) / Math.log(1024))
	let newSize = size / Math.pow(1024, index)

	// 保留的小数位数
	return newSize.toFixed(2) + ' ' + unit[index]
}

// 获取svg图标(id)列表
export const getIconList = (): string[] => {
	const rs: string[] = []
	const list = document.querySelectorAll('svg symbol[id^="icon-"]')
	for (let i = 0; i < list.length; i++) {
		rs.push(list[i].id)
	}
	return rs
}

// 获取字典Label
export const getDictLabel = (dictList: any[], dictType: string, dictValue: string) => {
	const type = dictList.find((element: any) => element.dictType === dictType)
	if (type) {
		const val = type.dataList.find((element: any) => element.dictValue === dictValue + '')
		if (val) {
			return val.dictLabel
		} else {
			return dictValue
		}
	} else {
		return dictValue
	}
}

// 获取字典Label样式
export const getDictLabelClass = (dictList: any[], dictType: string, dictValue: string): string => {
	const type = dictList.find((element: any) => element.dictType === dictType)
	if (type) {
		const val = type.dataList.find((element: any) => element.dictValue === dictValue + '')
		if (val) {
			return val.labelClass
		} else {
			return ''
		}
	} else {
		return ''
	}
}

// 获取字典数据列表
export function getDictDataList(dictList: any[], dictType: string) {
	const type = dictList.find((element: any) => element.dictType === dictType)
	if (type) {
		return type.dataList
	} else {
		return []
	}
}

// 全局组件安装
export const withInstall = <T>(component: T, alias?: string) => {
	const comp = component as any
	comp.install = (app: App) => {
		app.component(comp.name || comp.displayName, component)
		if (alias) {
			app.config.globalProperties[alias] = component
		}
	}
	return component as T & Plugin
}

export const isStrBlank = (item: string) => {
	if (!item || item === '' || item.trim().length === 0) {
		return true
	}
	return false
}

export const isStrEquals = (item1: string, item2: string) => {
	if (isStrBlank(item1) || isStrBlank(item2)) {
		return false
	}
	return item1.trim() === item2.trim()
}

export const downloadJson = (json: any, fileName: string) => {
	const jsonString = JSON.stringify(json)
	const blob = new Blob([jsonString], { type: 'application/json' })
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.download = fileName + '_' + getDate() + '.json'
	link.href = url
	link.click()

	URL.revokeObjectURL(url)
}

export const getDate = () => {
	const date = new Date()
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return year + '-' + month + day
}

export const shuffleArray = (array: Array<any>) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export const speakJapanese = (text: string) => {
	console.log(text)
	// 创建 SpeechSynthesisUtterance 对象
	let utterance = new SpeechSynthesisUtterance()
	utterance.rate = 1
	utterance.pitch = 1.5
	utterance.text = text // 设置要合成的文字内容
	utterance.lang = 'ja-JP' // 设置语音合成的语言为日语
	// 添加合成完成时的回调函数
	utterance.onend = function () {}
	window.speechSynthesis.speak(utterance)
}
