import Vue from "vue";
import Main from "./main.vue";

let DigiLoading = Vue.extend(Main);

const instance = new DigiLoading({
  el: document.createElement("div"),
});

instance.show = false;

const Loading = {
  show(message) {
    instance.show = true;
    instance.message = message || "";
    document.body.appendChild(instance.$el);
  },
  hide() {
    instance.show = false;
  },
};
// let instance ;
// const Loading = function(options) {

//  instance = new DigiLoading({

//   data: options

//  });

//  instance.$mount();

//  document.body.appendChild(instance.$el);

//  instance.visible = true;

//  return instance.close()

// }

export default Loading;
