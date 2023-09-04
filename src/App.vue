<template>
	<el-config-provider>
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTitle } from '@vueuse/core'
// 设置标题
useTitle('学习小工具')
</script>
