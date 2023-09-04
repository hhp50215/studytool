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
						<el-button class="m-button" type="primary" plain @click="openKouSuan()">简单口算生成(2元运算)</el-button>
						<kousuan-2y-config ref="kousuanRef" />
						&nbsp;&nbsp;
						<el-button class="m-button" type="primary" plain @click="alert('敬请期待')">口算生成(多元运算*)</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script ts setup>
import { ref } from 'vue'
import '@/styles/uiStyle.css'
import Kousuan2yConfig from '@/views/kousuan/kousuan2yConfig.vue'
const kousuanRef = ref()
const openKouSuan = () => {
	kousuanRef.value.show()
}
</script>
