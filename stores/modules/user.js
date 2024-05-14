import { defineStore } from 'pinia';
import { ref } from 'vue'
export const useUserStore = defineStore('my-user', () => {
	// token
	let token = ref('')
	// 微信用户信息
	let wxUserInfo = ref({
		wxUserType: 0,
		wxUserSex: 0,
		token: '',
		wxUserName: '',
		wxUserPhoto: '',
		wxUserPhone: '',
		wxNumber: '',
		// ...
	})

	function setWxUserInfo(payload) {
		token.value = payload.token
		wxUserInfo.value = payload
		console.log("使用仓库", wxUserInfo.value);
	}
	return {
		token,
		wxUserInfo,
		setWxUserInfo
	}
}, {
	persist: {
		paths: [
			'wxUserInfo',
			'token',
		],
		
	}
});