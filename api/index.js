import { http, toast} from '@/uni_modules/uview-plus'
// 微信小程序一键登录
export const wxlogin = async  (data, config = {}) => http.post('/wxapi/user/wxlogin', data, config)

// 获取当前登录用户信息
export const getUserInfo = (params) => http.get('/wxapi/user/getUserInfo', {params})