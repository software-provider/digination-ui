// 导入组件，组件必须声明 name
import ModelViewer from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
ModelViewer.install = function (Vue) {
  Vue.component(ModelViewer.name, ModelViewer)
}

export default ModelViewer
