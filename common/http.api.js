
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

// 引入api下js文件
let files = require.context('@/api', false, /\.js$/)
let reg = /\.\/(.*)\.js/

let modules = {}

files.keys().forEach((key) => {
  // index无需暴露出去
  if (key === './index.js') return
  // 获取js名称
  let name = key.match(reg)[1]

  // 将js中对象赋值到modules对应键名中
  modules[name] = files(key).default || files(key)
})

const install = (Vue, vm) => {
  vm.$u.api = {
	...modules
  }
}

export default {
  install
}
