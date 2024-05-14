<template>
	<view class="content">
		首页
		<up-button type="primary" text="获取用户信息" @click="getInfo"></up-button>
		<up-button type="primary" text="去登录" @click="goLogin"></up-button>
	</view>
</template>

<script setup>
	// import { ref } from 'vue';
	// import { onLoad } from '@dcloudio/uni-app';
	import { getUserInfo } from '@/api/index.js'
	// import { useUserStore } from '@/stores/index.js'
	async function getInfo() {
		const res = await getUserInfo()
		console.log("返回结果");
	}
	function goLogin(){
		uni.reLaunch({
			url: '/subPages/login/index'
		})
	}
</script>

<style>

</style>