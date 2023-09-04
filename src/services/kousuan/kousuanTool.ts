/**
 *  随机生成运算符
 * @param sslx 允许的运算符：1=+，2=-，3=x，4=/
 * @returns {string}
 */
export const genSslx = (sslx: string): string => {
	var max = 4
	var min = 1
	var rand = Math.random() * (max - min + 1) + min + ''
	if (sslx.indexOf(rand) !== -1) {
		return rand
	} else {
		return genSslx(sslx)
	}
}

/**
 * 生成随机数
 * @param minParam
 * @param maxParam
 */
export const randomNumber = (minParam: string, maxParam: string): number => {
	let min: number = 0
	if (minParam === '') {
		min = 0
	} else {
		min = parseInt(minParam)
	}
	let max: number = 0
	if (maxParam === '') {
		max = 999
	} else {
		max = parseInt(maxParam)
	}
	return parseInt(String(Math.random() * (max - min + 1) + min))
}

export const getSslxFh = (sslx: string): any => {
	if (sslx === '1') {
		return '＋'
	}
	if (sslx === '2') {
		return '－'
	}
	if (sslx === '3') {
		return '×'
	}
	if (sslx === '4') {
		return '÷'
	}
}
