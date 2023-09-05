<template>
	<el-dialog v-model="state.dialogVisible" width="50%" center>
		<template #header="{ titleId, titleClass }">
			<div class="my-header">
				<h4 :id="titleId" :class="titleClass">口算配置</h4>
			</div>
		</template>
		<el-form :model="state.form">
			<el-form-item label="题目数量" :label-width="formLabelWidth">
				<el-select v-model="state.form.tmsl" placeholder="题目数量">
					<el-option label="25题(一列)" value="25" />
					<el-option label="50题(二列)" value="50" />
					<el-option label="75题(三列)" value="75" />
				</el-select>
			</el-form-item>
			<el-form-item label="乘法配置" :label-width="formLabelWidth">
				<el-input v-model="state.form.cfysdyzxz" placeholder="运算最小值" style="width: 100px" />
				~
				<el-input v-model="state.form.cfysdyzdz" placeholder="运算最大值" style="width: 100px" />
			</el-form-item>
			<el-form-item label="加减法配置" :label-width="formLabelWidth">
				<el-input v-model="state.form.ysdyzxz" placeholder="运算最小值" style="width: 100px" />
				~
				<el-input v-model="state.form.ysdyzdz" placeholder="运算最大值" style="width: 100px" />
			</el-form-item>
			<el-form-item label="括号配置" :label-width="formLabelWidth">
				<el-select v-model="state.form.kh" placeholder="是否括号" style="width: 100px">
					<el-option label="无" value="0" />
					<el-option label="有" value="1" />
				</el-select>
				&nbsp;
				<el-input v-if="state.form.kh === '1'" v-model="state.form.khjgzdz" placeholder="括号结果最大值" style="width: 100px" />
			</el-form-item>

			<el-form-item label="运算结果最大值" :label-width="formLabelWidth">
				<el-select v-model="state.form.ysjgzdz" placeholder="运算结果最大值">
					<el-option label="不限制" value="99999" />
					<el-option label="10" value="10" />
					<el-option label="20" value="20" />
					<el-option label="50" value="50" />
					<el-option label="100" value="100" />
				</el-select>
			</el-form-item>
			<el-form-item label="算式必须含有" :label-width="formLabelWidth">
				<el-select v-model="state.form.ssbxbh" placeholder="算式必须含有">
					<el-option label="不限制" value="" />
					<el-option label="大于1的数" value="1" />
					<el-option label="大于5的数" value="5" />
					<el-option label="大于10的数" value="10" />
					<el-option label="大于20的数" value="20" />
					<el-option label="大于30的数" value="30" />
					<el-option label="大于50的数" value="50" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="genQuestion">生成口算题目</el-button>
			</span>
		</template>
		<cf-kousuan-3y-result ref="kousuanResultRef" />
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import CfKousuan3yResult from '@/views/kousuan/cfkousuan3y/cfKousuan3yResult.vue'
import cfKousuan3yService from '@/services/kousuan/cfKousuan3yService'
const formLabelWidth = '140px'
const kousuanResultRef = ref()
const state = reactive({
	dialogVisible: false,
	form: {
		tmsl: '25',
		cfysdyzxz: '1',
		cfysdyzdz: '10',
		ysdyzxz: '1',
		ysdyzdz: '10',
		ysjgzdz: '99999',
		ssbxbh: '',
		kh: '0',
		khjgzdz: '9'
	}
})
const show = () => {
	state.dialogVisible = true
	state.form = cfKousuan3yService.readConfig()
}
const genQuestion = () => {
	cfKousuan3yService.saveConfig(state.form)
	kousuanResultRef.value.show()
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
