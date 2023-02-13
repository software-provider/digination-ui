<template>
  <div v-if="show" class="loader">
    <div class="loader-rainbow">
      <div class="loader-inner">
      </div>
      <div v-if="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.loader{
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader-rainbow {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999999;
    color:#fff
}
.loader-inner {
    height: 100px;
    width: 100px;
    background: url("../../assets/img/loading/loading.png");
    animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
    margin-bottom: 22px;
}
.message {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;

}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
