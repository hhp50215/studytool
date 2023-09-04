<template>
	<el-icon>
		<House style="cursor: pointer" @click="onToHome" />
	</el-icon>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { House } from '@element-plus/icons-vue'
const router = useRouter()

const onBack = () => {
	router.back()
}
const onToHome = () => {
	router.replace('/')
}
</script>

<style lang="scss" scoped>
.layout-error {
	img {
		width: 800px;
	}
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
