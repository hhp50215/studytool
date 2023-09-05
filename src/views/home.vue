<template>
	<div style="display: flex; justify-content: center">
		<div class="main-div">
			<h1 style="text-align: center">学习小工具</h1>
			<div class="container">
				<div class="title" style="display: flex; justify-content: space-between">
					<div>数学工具</div>
				</div>
				<div class="content" style="display: flex; justify-content: space-between">
					<div>
						<el-button class="m-button" type="primary" plain @click="openKouSuan2y()">简单口算生成(2元运算)</el-button>
						<kousuan-2y-config ref="kousuan2yRef" />
						&nbsp;&nbsp;
						<el-button class="m-button" type="primary" plain @click="openKouSuan3y()">口算生成(3元运算)</el-button>
						<kousuan-3y-config ref="kousuan3yRef" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script ts setup>
import { ref } from 'vue'
import '@/styles/uiStyle.css'
import Kousuan2yConfig from '@/views/kousuan/kousuan2y/kousuan2yConfig.vue'
import Kousuan3yConfig from '@/views/kousuan/kousuan3y/kousuan3yConfig.vue'
const kousuan2yRef = ref()
const kousuan3yRef = ref()
const openKouSuan2y = () => {
	kousuan2yRef.value.show()
}
const openKouSuan3y = () => {
	kousuan3yRef.value.show()
}
</script>
