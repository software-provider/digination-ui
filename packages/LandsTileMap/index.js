// 导入组件，组件必须声明 name
import LandsTileMap from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
LandsTileMap.install = function (Vue) {
  Vue.component(LandsTileMap.name, LandsTileMap)
}

export default LandsTileMap
