import Vue from 'vue'

let vm = Vue.prototype

export default {
	getSwiper : () => vm.$u.get('/api/News/GetIndexPic?columnId=18'),
	
	aboutUs : () => vm.$u.get('/api/News/Get?id=16'),
	
	authLogin: (params) => vm.$u.post('/api/Auth/LoginMiniProgram', params),
	
	createUser: (params) => vm.$u.post('/api/WxUser/Create', params),
} 