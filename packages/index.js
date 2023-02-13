// packages / index.js
import "./assets/icon/iconfont.css";
// 导入单个组件
import WalletModalModel from "./WalletModalModel/index";
import Web3Model from "./Web3Model/index";
// 全局
import { EventBus } from "./Toast/src/event-bus";
import Loading from "./Loading/index";
// 模板组件
import LandsTileMap from "./LandsTileMap/index";
import DigiToasts from "./Toast/index";
import DigiDialog from "./Dialog/index";
import ModelViewer from "./ModelViewer/index";
import DigiButton from "./Button/index";
import DigiInput from "./Input/index";
// 以数组的结构保存组件，便于遍历
const components = [
  LandsTileMap,
  ModelViewer,
  DigiDialog,
  DigiButton,
  DigiToasts,
  DigiInput,
];

// 定义 install 方法
const install = function (Vue) {
  Vue.prototype.$WalletModalModel = WalletModalModel;
  Vue.prototype.$Web3Model = Web3Model;
  Vue.prototype.$Loading = Loading;
  Vue.prototype.$toast = {
    /**
     * Send the event on channel (toast-message) with a given payload.
     *
     * @param {string} message
     * @param {string} type
     */
    send(message, type, options) {
      EventBus.$emit("toast-message", {
        message: message,
        type: type,
        options: options,
      });
    },

    /**
     * Send a success message event.
     *
     * @param {string} message
     */
    success(message, options = {}) {
      this.send(message, "success", options);
    },

    /**
     * Send a warning message event.
     *
     * @param {string} message
     */
    warning(message, options = {}) {
      this.send(message, "warning", options);
    },

    /**
     * Send an info message event.
     *
     * @param {string} message
     */
    info(message, options = {}) {
      this.send(message, "info", options);
    },

    /**
     * Send an error message event.
     *
     * @param {string} message
     */
    error(message, options = {}) {
      this.send(message, "danger", options);
    },
  };

  if (install.installed) return;
  install.installed = true;
  // 遍历并注册全局组件
  components.map((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components,
};
