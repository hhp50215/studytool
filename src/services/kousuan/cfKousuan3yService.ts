import { randomNumber, genSslx, getSslxFh } from '@/services/kousuan/kousuanTool'

const storeConfigKey = 'cf-kousuan-3y-config'

export interface CfConfig3Y {
	tmsl: string
	cfysdyzxz: string
	cfysdyzdz: string
	ysdyzxz: string
	ysdyzdz: string
	ysjgzdz: string
	ssbxbh: string
	kh: string
	khjgzdz: string
}

interface YstmType {
	ysdy: Array<any>
	sslx: Array<any>
	khwz: number
}

export default class kousuan2yService {
	static saveConfig = (config: CfConfig3Y) => {
		localStorage.setItem(storeConfigKey, JSON.stringify(config))
	}
	static readConfig = (): CfConfig3Y => {
		const confitStr = localStorage.getItem(storeConfigKey)
		if (confitStr && confitStr !== '') {
			return JSON.parse(confitStr)
		}
		return {
			tmsl: '25',
			cfysdyzxz: '1',
			cfysdyzdz: '10',
			ysdyzxz: '10',
			ysdyzdz: '50',
			ysjgzdz: '100',
			ssbxbh: '',
			kh: '0',
			khjgzdz: '9'
		}
	}

	static genQuestion = (config: CfConfig3Y): Array<string> => {
		var result = [] as Array<string>
		for (let i = 0; i < parseInt(config.tmsl); i++) {
			let questionStr = this.genQuestionStr(config)
			while (questionStr.startsWith('NaN')) {
				questionStr = this.genQuestionStr(config)
			}
			result.push(questionStr)
		}
		return result
	}

	static genQuestionStr = (config: CfConfig3Y): string => {
		let question = {} as YstmType
		question = this.genOneQuestion(config)
		let answerIndex = randomNumber('0', '3') //答案位置索引
		question.ysdy[answerIndex] = '&nbsp;___&nbsp;'
		if (question.khwz === -1) {
			return question.ysdy[0] + question.sslx[0] + question.ysdy[1] + question.sslx[1] + question.ysdy[2] + '=' + question.ysdy[3]
		} else {
			if (question.khwz === 0) {
				return '(&nbsp' + question.ysdy[0] + question.sslx[0] + question.ysdy[1] + '&nbsp)' + question.sslx[1] + question.ysdy[2] + '=' + question.ysdy[3]
			} else {
				return +question.ysdy[0] + question.sslx[0] + '(&nbsp' + question.ysdy[1] + question.sslx[1] + question.ysdy[2] + '&nbsp)' + '=' + question.ysdy[3]
			}
		}
	}

	static genOneQuestion = (config: CfConfig3Y): YstmType => {
		let ystm = this.genYstm(config)
		let ysdy1 = ystm.ysdy[0]
		let ysdy2 = ystm.ysdy[1]
		let ysdy3 = ystm.ysdy[2]
		let ysjg = ystm.ysdy[3]
		if (ysjg < 0 || config.ysjgzdz === '' || ysjg > parseInt(config.ysjgzdz)) {
			return this.genOneQuestion(config)
		}
		let ssbxbh = parseInt(config.ssbxbh)
		if (config.ssbxbh !== '' && ysdy1 < ssbxbh && ysdy2 < ssbxbh && ysdy3 < ssbxbh && ysjg < ssbxbh) {
			return this.genOneQuestion(config)
		}
		return ystm
	}

	static genYstm = (config: CfConfig3Y): YstmType => {
		let tmType = 0
		if (config.kh === '0') {
			tmType = randomNumber('1', '4')
		} else {
			tmType = randomNumber('1', '8')
		}
		if (tmType === 1) {
			return this.ystm1(config)
		}
		if (tmType === 2) {
			return this.ystm2(config)
		}
		if (tmType === 3) {
			return this.ystm3(config)
		}
		if (tmType === 4) {
			return this.ystm4(config)
		}
		if (tmType === 5) {
			return this.ystm5(config)
		}
		if (tmType === 6) {
			return this.ystm6(config)
		}
		if (tmType === 7) {
			return this.ystm7(config)
		}
		if (tmType === 8) {
			return this.ystm8(config)
		}
		return {} as YstmType
	}

	static ystm1 = (config: CfConfig3Y): YstmType => {
		//axb+c=d
		let a = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let b = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let c = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let ysjg = a * b + c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['×', '+'],
			khwz: -1
		}
	}

	static ystm2 = (config: CfConfig3Y): YstmType => {
		//a+bxc=d
		let a = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let b = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let c = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let ysjg = a + b * c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['+', '×'],
			khwz: -1
		}
	}
	static ystm3 = (config: CfConfig3Y): YstmType => {
		//axb-c=d
		let a = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let b = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let c = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let ysjg = a * b - c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['×', '-'],
			khwz: -1
		}
	}
	static ystm4 = (config: CfConfig3Y): YstmType => {
		//a+bxc=d
		let a = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let b = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let c = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let ysjg = a - b * c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['-', '×'],
			khwz: -1
		}
	}
	static ystm5 = (config: CfConfig3Y): YstmType => {
		//(a+b)xc=d
		let a = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let b = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		if (a + b > parseInt(config.khjgzdz)) {
			return this.ystm5(config)
		}
		let c = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数2
		let ysjg = (a + b) * c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['+', '×'],
			khwz: 0
		}
	}
	static ystm6 = (config: CfConfig3Y): YstmType => {
		//ax(b+c)=d
		let a = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let b = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		let c = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		if (b + c > parseInt(config.khjgzdz)) {
			return this.ystm6(config)
		}

		let ysjg = a * (b + c)
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['×', '+'],
			khwz: 1
		}
	}
	static ystm7 = (config: CfConfig3Y): YstmType => {
		//(a-b)*c=d
		let a = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let b = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let c = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		if (a - b <= 0 || a - b > parseInt(config.khjgzdz)) {
			return this.ystm7(config)
		}

		let ysjg = (a - b) * c
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['-', '×'],
			khwz: 0
		}
	}
	static ystm8 = (config: CfConfig3Y): YstmType => {
		//ax(b-c)=d
		let a = randomNumber(config.cfysdyzxz, config.cfysdyzdz) //计算数1
		let b = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let c = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1

		if (b - c <= 0 || b - c > parseInt(config.khjgzdz)) {
			return this.ystm8(config)
		}
		let ysjg = a * (b - c)
		return {
			ysdy: [a, b, c, ysjg],
			sslx: ['×', '-'],
			khwz: 1
		}
	}
}
