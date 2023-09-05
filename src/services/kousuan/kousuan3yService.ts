import { randomNumber, genSslx, getSslxFh } from '@/services/kousuan/kousuanTool'

const storeConfigKey = 'kousuan-3y-config'

export interface Config3Y {
	sslx: Array<any>
	tmsl: string
	ysdyzxz: string
	ysdyzdz: string
	ysjgzdz: string
	ssbxbh: string
}

interface YstmType {
	ysdy: Array<any>
	sslx: Array<any>
}

export default class kousuan2yService {
	static saveConfig = (config: Config3Y) => {
		localStorage.setItem(storeConfigKey, JSON.stringify(config))
	}
	static readConfig = (): Config3Y => {
		const confitStr = localStorage.getItem(storeConfigKey)
		if (confitStr && confitStr !== '') {
			return JSON.parse(confitStr)
		}
		return {
			sslx: ['1'],
			tmsl: '25',
			ysdyzxz: '1',
			ysdyzdz: '10',
			ysjgzdz: '99999',
			ssbxbh: ''
		}
	}

	static genQuestion = (config: Config3Y): Array<string> => {
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

	static genQuestionStr = (config: Config3Y): string => {
		let question = {} as YstmType
		question = this.genOneQuestion(config)
		let answerIndex = randomNumber('0', '3') //答案位置索引
		question.ysdy[answerIndex] = '(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)'
		return question.ysdy[0] + question.sslx[0] + question.ysdy[1] + question.sslx[1] + question.ysdy[2] + '=' + question.ysdy[3]
	}

	static genOneQuestion = (config: Config3Y): YstmType => {
		let ysdy1 = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数1
		let ysdy2 = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		let ysdy3 = randomNumber(config.ysdyzxz, config.ysdyzdz) //计算数2
		let ystmResult = this.genYstm(ysdy1, ysdy2, ysdy3, config.sslx)
		let ysjg = ystmResult.ysdy[3]
		if (ysjg < 0 || config.ysjgzdz === '' || ysjg > parseInt(config.ysjgzdz)) {
			return this.genOneQuestion(config)
		}
		let ssbxbh = parseInt(config.ssbxbh)
		if (config.ssbxbh !== '' && ysdy1 < ssbxbh && ysdy2 < ssbxbh && ysdy3 < ssbxbh && ysjg < ssbxbh) {
			return this.genOneQuestion(config)
		}
		return ystmResult
	}

	static genYstm = (ysdy1: number, ysdy2: number, ysdy3: number, sslx: Array<string>): YstmType => {
		let ystm = {} as YstmType
		if (sslx.length === 1) {
			if (sslx[0] === '1') {
				return this.genJiafaYstm(ysdy1, ysdy2, ysdy3)
			}
			if (sslx[0] === '2') {
				return this.genJianfaYstm(ysdy1, ysdy2, ysdy3)
			}
		} else {
			let randomNum = randomNumber('0', '2')
			if (randomNum === 0) {
				return this.genHunheYunsuan(ysdy1, ysdy2, ysdy3)
			} else if (randomNum === 1) {
				return this.genJiafaYstm(ysdy1, ysdy2, ysdy3)
			} else if (randomNum === 2) {
				return this.genJianfaYstm(ysdy1, ysdy2, ysdy3)
			}
		}
		return ystm
	}

	static genJiafaYstm = (ysdy1: number, ysdy2: number, ysdy3: number): YstmType => {
		let ysjg = ysdy1 + ysdy2 + ysdy3
		return {
			ysdy: [ysdy1, ysdy2, ysdy3, ysjg],
			sslx: ['+', '+']
		}
	}

	static genJianfaYstm = (ysdy1: number, ysdy2: number, ysdy3: number): YstmType => {
		let ysdys = [ysdy1, ysdy2, ysdy3]
		let realYsdys = ysdys.sort((a, b) => b - a)
		let randomNux = randomNumber('0', '1')
		if (randomNux === 0) {
			let ysjg = realYsdys[0] - realYsdys[1] - realYsdys[2]
			return {
				ysdy: [realYsdys[0], realYsdys[1], realYsdys[2], ysjg],
				sslx: ['-', '-']
			}
		} else {
			let ysjg = realYsdys[0] - realYsdys[2] - realYsdys[1]
			return {
				ysdy: [realYsdys[0], realYsdys[2], realYsdys[1], ysjg],
				sslx: ['-', '-']
			}
		}
	}

	static genHunheYunsuan = (ysdy1: number, ysdy2: number, ysdy3: number): YstmType => {
		let randomNux = randomNumber('0', '1')
		if (randomNux === 0) {
			let ysjg = ysdy1 + ysdy2 - ysdy3
			return {
				ysdy: [ysdy1, ysdy2, ysdy3, ysjg],
				sslx: ['+', '-']
			}
		} else {
			let ysdys = [ysdy1, ysdy2, ysdy3]
			let realYsdys = ysdys.sort((a, b) => b - a)
			let randomNux = randomNumber('0', '1')
			if (randomNux === 0) {
				let ysjg = realYsdys[0] - realYsdys[1] + realYsdys[2]
				return {
					ysdy: [realYsdys[0], realYsdys[1], realYsdys[2], ysjg],
					sslx: ['-', '+']
				}
			} else {
				let ysjg = realYsdys[0] - realYsdys[2] + realYsdys[1]
				return {
					ysdy: [realYsdys[0], realYsdys[2], realYsdys[1], ysjg],
					sslx: ['-', '+']
				}
			}
		}
	}
}
