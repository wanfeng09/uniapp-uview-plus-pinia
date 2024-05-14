<template>
	<view class="content">
		<up-button type="primary" text="一键登录" @click="login"></up-button>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { wxlogin } from '@/api/index.js'
	import { useUserStore } from '@/stores/index.js'
	let upRoute = ref('')
	onLoad((option) => {
		upRoute.value = option && option.route && option.route !== '/subPages/login/index' ? option.route :
			'/pages/index/index'
	})

	function getUserProfile() {
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				desc: 'Wexin',
				success: res => {
					// console.log('读取用户信息',res);
					const user = JSON.parse(res.rawData)
					resolve(user)
				}
			})
		})
	}

	function getLoginCode() {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					let code = res.code;
					resolve(code)
				}
			})
		})
	}
	async function login() {
		//小程序appid
		// const appid = uni.getAccountInfoSync().miniProgram.appId
		const user = await getUserProfile()
		const code = await getLoginCode()
		let queryForm = {
			code,
			wxPhoto: user.avatarUrl,
			wxUserName: user.nickName,
			wxgender: user.gender,
		}
		const res = await wxlogin(queryForm)
		const userInfo = res.data
		if (userInfo) {
			const userType = useUserStore().wxUserInfo.wxUserType
			useUserStore().setWxUserInfo(userInfo)
			let url = userType === Number(userInfo.wxUserType) ? upRoute.value : '/pages/index/index'
			uni.reLaunch({
				url,
			});
		}
	}
</script>

<style>

</style>