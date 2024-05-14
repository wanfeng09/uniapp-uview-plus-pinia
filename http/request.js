import { http, toast } from '@/uni_modules/uview-plus'
import { useUserStore } from '@/stores/index.js'
const requestInterceptors = (vm) => {
	/**
	 * 请求拦截
	 */
	http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 是否启动/关闭loading
		if (!config.custom.loading) {
			uni.showLoading({
				mask: true,
				title: '请稍后...'
			})
		}
		const token = useUserStore().token
		console.log("token", token);
		if (token) {
			config.header['Authorization'] = token
		}
		return config
	}, (config) => Promise.reject(config))
}

const responseInterceptors = (vm) => {
	/**
	 * 响应拦截
	 * @param {Object} http 
	 */
	http.interceptors.response.use((response) => {
		// 关闭加载
		uni.hideLoading()
		const status = response.statusCode
		if (status === 200) {
			if (response.data.code === 200) {
				return response.data || {}
			} else if (response.data.code === 401) {
				// 清空缓存
				uni.clearStorageSync()
				//跳转到登录页面
				const index = getCurrentPages().length - 1
				var route = getCurrentPages()[index].$page.fullPath
				uni.reLaunch({
					url: `/subPages/login/index?route=${route}`,
				});
				return Promise.reject('请重新登录!')
			} else if (response.data.code === 500) {
				uni.showToast({
					icon: 'none',
					title: '服务器内部错误!'
				});
				return Promise.reject('服务器内部错误!')
			} else {
				uni.showToast({
					icon: 'none',
					title: response.data.msg || '请求错误!',
				});
				return Promise.reject(response.data.msg || '请求错误!')
			}
		} else {
			uni.showToast({
				icon: 'none',
				title: '未知错误!',
			});
			return Promise.reject("未知错误!")
		}
	}, (response) => {
		// 关闭加载
		uni.hideLoading()
		/*  对响应错误做点什么 （statusCode !== 200）*/
		const status = response.statusCode
		const title = response.data ? (response.data.msg ? response.data.msg :
			"网络异常!") : "网络异常！"
		uni.showToast({
			icon: 'none',
			title,
		});
		return Promise.reject(response)
	})
}

export {
	requestInterceptors,
	responseInterceptors
}