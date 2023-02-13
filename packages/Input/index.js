// 导入组件，组件必须声明 name
import DigiInput from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
DigiInput.install = function (Vue) {
  Vue.component(DigiInput.name, DigiInput)
}

export default DigiInput