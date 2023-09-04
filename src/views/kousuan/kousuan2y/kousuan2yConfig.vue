<template>
	<el-dialog v-model="state.dialogVisible" width="50%" center>
		<template #header="{ titleId, titleClass }">
			<div class="my-header">
				<h4 :id="titleId" :class="titleClass">口算配置</h4>
			</div>
		</template>
		<el-form :model="state.form">
			<el-form-item label="算术类型" :label-width="formLabelWidth">
				<el-checkbox-group v-model="state.form.sslx">
					<el-checkbox label="1" border>加法</el-checkbox>
					<el-checkbox label="2" border>减法</el-checkbox>
					<el-checkbox label="3" border>乘法</el-checkbox>
					<el-checkbox label="4" border>除法</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="题目数量" :label-width="formLabelWidth">
				<el-select v-model="state.form.tmsl" placeholder="题目数量">
					<el-option label="25题(一列)" value="25" />
					<el-option label="50题(二列)" value="50" />
					<el-option label="75题(三列)" value="75" />
				</el-select>
			</el-form-item>
			<el-form-item label="运算单元最小值" :label-width="formLabelWidth">
				<el-select v-model="state.form.ysdyzxz" placeholder="运算单元最小值">
					<el-option label="1" value="1" />
					<el-option label="2" value="2" />
					<el-option label="3" value="3" />
					<el-option label="5" value="5" />
					<el-option label="10" value="10" />
					<el-option label="20" value="20" />
					<el-option label="50" value="50" />
					<el-option label="100" value="100" />
				</el-select>
			</el-form-item>
			<el-form-item label="运算单元最大值" :label-width="formLabelWidth">
				<el-select v-model="state.form.ysdyzdz" placeholder="运算单元最大值">
					<el-option label="9" value="9" />
					<el-option label="10" value="10" />
					<el-option label="20" value="20" />
					<el-option label="50" value="50" />
					<el-option label="100" value="100" />
				</el-select>
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
					<el-option label="大于5的数" value="5" />
					<el-option label="大于10的数" value="10" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="genQuestion">生成口算题目</el-button>
			</span>
		</template>
		<kousuan-2y-result ref="kousuanResultRef" />
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Kousuan2yResult from '@/views/kousuan/kousuan2y/kousuan2yResult.vue'
import kousuan2yService from '@/services/kousuan/kousuan2yService'
const formLabelWidth = '140px'
const kousuanResultRef = ref()
const state = reactive({
	dialogVisible: false,
	form: {
		sslx: ['1'],
		tmsl: '20',
		ysdyzxz: '1',
		ysdyzdz: '10',
		ysjgzdz: '99999',
		ssbxbh: ''
	}
})
const show = () => {
	state.dialogVisible = true
	state.form = kousuan2yService.readConfig()
}
const genQuestion = () => {
	kousuan2yService.saveConfig(state.form)
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
