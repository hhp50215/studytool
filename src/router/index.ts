import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { pathToCamel } from '@/utils/tool'

NProgress.configure({ showSpinner: false })

const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: () => import('../views/home.vue')
	},
	{
		path: '/404',
		component: () => import('../views/404.vue')
	}
]

export const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

// 路由跳转前
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	next()
})

// 路由加载后
router.afterEach(() => {
	NProgress.done()
})

// 加载vue组件
const layoutModules = import.meta.glob('/src/views/**/*.vue')

// 根据路径，动态获取vue组件
const getDynamicComponent = (path: string): any => {
	return layoutModules[`/src/views/${path}.vue`]
}

// 根据菜单列表，生成路由数据
export const generateRoutes = (menuList: any): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []
	menuList.forEach((menu: any) => {
		let component = getDynamicComponent(menu.url)
		let path = '/' + menu.url
		const route: RouteRecordRaw = {
			path: path,
			name: pathToCamel(path),
			component: component,
			children: [],
			meta: {
				title: menu.name,
				icon: menu.icon,
				id: '' + menu.id,
				url: menu.url,
				cache: true,
				newOpen: menu.openStyle === 1,
				breadcrumb: []
			}
		}

		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			route.children?.push(...generateRoutes(menu.children))
		}
		routerList.push(route)
	})

	return routerList
}
