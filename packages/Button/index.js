import DigiButton from "./src/main.vue";

DigiButton.install = function (Vue) {
  Vue.component(DigiButton.name, DigiButton);
};

export default DigiButton;
