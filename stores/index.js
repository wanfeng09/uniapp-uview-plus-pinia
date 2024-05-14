import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
// 导入模块
import { useUserStore } from './modules/user'
const store = createPinia()
// 持久化配置
store.use(createPersistedState({
	storage: {
		setItem(key, value) {
			uni.setStorageSync(key, value)
		},
		getItem(key) {
			return uni.getStorageSync(key)
		}
	}
}))
export default store
// 导出模块
export { useUserStore }
