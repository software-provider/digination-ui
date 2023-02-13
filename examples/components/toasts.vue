<template>
  <div class="demo-main">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div >
        <h1 class="mb-5 text-5xl font-bold">Digi Toasts </h1>
        <p class="mb-5">Digi Toasts plugin.</p>

        <div class="item">
            <digi-button   type="info"  @click="handleClickInfo">button</digi-button>
            <digi-button   type="success" @click="handleClickSuccess">button</digi-button>
            <digi-button   type="warning"  @click="handleClickWarning">button</digi-button>
            <digi-button   type="danger"  @click="handleClickError">button</digi-button>
        </div>
      </div>

    </div>
    <digi-toasts></digi-toasts>
  </div>

</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data () {
    return {
      visible: false,
      plain: true,
      round: true,
      loading: true,
      circle: true,
      disabled: true
    }
  },
  methods: {
    handleClickInfo () {
      this.$toast.info('this is info message')
    },
    handleClickSuccess () {
      this.$toast.success('this is successful message')
    },
    handleClickError () {
      this.$toast.error('this is error message')
    },
    handleClickWarning () {
      this.$toast.warning('this is warning message')
    }
  }
}
</script>
<style scoped lang="scss">
.demo-main{
  display: flex;
  justify-content: center;
  text-align: center;
  button{
    margin-right: 10px;
  }
  .item{
    margin-bottom: 20px;
  }
}
</style>
