import { randomNumber, genSslx, getSslxFh } from '@/services/kousuan/kousuanTool'

const storeConfigKey = 'kousuan-2y-config'

export interface Config2Y {
	sslx: Array<any>
	tmsl: string
	ysdyzxz: string
	ysdyzdz: string
	ysjgzdz: string
	ssbxbh: string
}

interface questionType {
	ysdy: Array<any>
	sslx: string
}

export default class kousuan2yService {
	static saveConfig = (config: Config2Y) => {
		localStorage.setItem(storeConfigKey, JSON.stringify(config))
	}
	static readConfig = (): Config2Y => {
		const confitStr = localStorage.getItem(storeConfigKey)
		if (confitStr && confitStr !== '') {
			return JSON.parse(confitStr)
		}
		return {
			sslx: ['1'],
			tmsl: '20',
			ysdyzxz: '1',
			ysdyzdz: '10',
			ysjgzdz: '99999',
			ssbxbh: ''
		}
	}

	static genQuestion = (config: Config2Y): Array<string> => {
		var result = [] as Array<string>
		for (let i = 0; i < parseInt(config.tmsl); i++) {
			let questionStr = this.genQuestionStr(config)
			//一直循环到题目不存在
			while (result.indexOf(questionStr) !== -1) {
				questionStr = this.genQuestionStr(config)
			}
			result.push(questionStr)
		}
		return result
	}

	static genQuestionStr = (config: Config2Y): string => {
		let question = {} as questionType
		if (config.sslx.length === 1) {
			question = this.genOneQuestion(config.sslx[0], config)
		} else {
			let idx = randomNumber('0', config.sslx.length - 1 + '')
			question = this.genOneQuestion(config.sslx[idx], config)
		}
		let answerIndex = randomNumber('0', '2') //答案位置索引
		question.ysdy[answerIndex] = '(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)'
		return question.ysdy[0] + getSslxFh(question.sslx) + question.ysdy[1] + '=' + question.ysdy[2]
	}

	static genOneQuestion = (sslx: string, config: Config2Y): questionType => {
		let ysdy1 = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let ysdy2 = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		let ysjg = 0
		if (sslx === '1') {
			ysjg = ysdy1 + ysdy2
		} else if (sslx === '2') {
			ysjg = ysdy1 - ysdy2
		} else if (sslx === '3' || sslx === '4') {
			ysjg = ysdy1 * ysdy2
		}
		if (ysjg < 0 || config.ysjgzdz === '' || ysjg > parseInt(config.ysjgzdz)) {
			return this.genOneQuestion(sslx, config)
		}
		let ssbxbh = parseInt(config.ssbxbh)
		if (config.ssbxbh !== '' && ysdy1 < ssbxbh && ysdy2 < ssbxbh && ysjg < ssbxbh) {
			return this.genOneQuestion(sslx, config)
		}
		return {
			ysdy: [ysdy1, ysdy2, ysjg],
			sslx: sslx
		}
	}
}
