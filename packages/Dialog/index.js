// 导入组件，组件必须声明 name
import DigiDialog from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
DigiDialog.install = function (Vue) {
  Vue.component(DigiDialog.name, DigiDialog)
}

export default DigiDialog