import DigiToasts from "./src/main.vue";

DigiToasts.install = function (Vue) {
  Vue.component(DigiToasts.name, DigiToasts);
};

export default DigiToasts;
