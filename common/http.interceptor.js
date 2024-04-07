// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: 'https://wsl.sino2sino.com:51',
    loadingText: '努力加载中~',
    loadingTime: 800
  })

  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = (config) => {
	
    config.header.SYSTOKEN = vm.vuex_token

    return config
    // 如果return一个false值，则会取消本次请求
  }

  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = (res) => {
    if (res.statusCode === 200) {
      return res
    } else if (res.statusCode === 401) {
		   vm.$u.toast(res.message)

      // 401为token失效，这里跳转登录
	  
      // setTimeout(() => {
      // 	vm.$u.route('/pages/user/login')
      // }, 1500)
      return false
    } else {
      vm.$u.toast(res.message)

      return false
    }
  }
}

export default {
  install
}
