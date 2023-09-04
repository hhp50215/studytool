import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { createPinia } from 'pinia'
import { directive } from './utils/directive'
import { router } from './router'
import 'virtual:svg-icons-register'

import '@/icons/iconfont/iconfont'
import 'element-plus/dist/index.css'

// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// @ts-ignore
import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
	Prism
})

const app = createApp(App)
app.use(createPinia())
app.use(VueMarkdownEditor)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
// use
// 表单设计器
// 注册 自定义指令
directive(app)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// @ts-ignore
import print from 'vue3-print-nb'
app.use(print)
