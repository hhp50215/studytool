<template>
	<el-dialog v-model="state.dialogVisible" top="2vh" width="50%" center>
		<template #header="{ titleId, titleClass }">
			<div class="my-header">
				<h4 :id="titleId" :class="titleClass">题目结果</h4>
			</div>
		</template>
		<div style="height: 600px; overflow-y: auto">
			<table id="printArea2" style="width: 100%">
				<tr>
					<td colspan="3" style="text-align: center">姓名：_______________&nbsp;&nbsp;&nbsp;&nbsp; 日期：_______________</td>
				</tr>
				<tr>
					<td colspan="3">&nbsp;</td>
				</tr>
				<tr>
					<td>
						<div v-for="(question, index) in state.questions1" :key="index + 'q1'" style="margin-top: 1px; margin-left: 20px; text-align: left">
							<p style="margin-top: 1px" v-html="index + 1 + '、&nbsp;' + question"></p>
						</div>
					</td>
					<td>
						<div v-for="(question, index) in state.questions2" :key="index + 'q2'" style="margin-top: 1px; margin-left: 20px; text-align: left">
							<p style="margin-top: 1px" v-html="index + 26 + '、&nbsp;' + question"></p>
						</div>
					</td>
					<td>
						<div v-for="(question, index) in state.questions3" :key="index + 'q3'" style="margin-top: 1px; margin-left: 20px; text-align: left">
							<p style="margin-top: 1px" v-html="index + 51 + '、&nbsp;' + question"></p>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button v-print="'#printArea2'" type="primary">打印</el-button>
				<el-button type="primary" @click="show">重新生成</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import kousuan2yService from '@/services/kousuan/kousuan2yService'

const state = reactive({
	dialogVisible: false,
	questions1: [] as Array<string>,
	questions2: [] as Array<string>,
	questions3: [] as Array<string>
})
const show = () => {
	state.dialogVisible = true
	let questions = kousuan2yService.genQuestion(kousuan2yService.readConfig())
	if (questions.length <= 25) {
		state.questions1 = questions
	}
	if (questions.length > 25 && questions.length <= 50) {
		state.questions1 = questions.slice(0, 25)
		state.questions2 = questions.slice(25)
	}
	if (questions.length > 50 && questions.length <= 75) {
		state.questions1 = questions.slice(0, 25)
		state.questions2 = questions.slice(25, 50)
		state.questions3 = questions.slice(50)
	}
}

defineExpose({
	show
})
</script>
<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>
