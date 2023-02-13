<template>
  <div class="demo-main">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div >
        <h1 class="mb-5 text-5xl font-bold">Digi Button </h1>
        <p class="mb-5">Digi Button plugin.</p>

        <div class="item">
            <digi-button   type="primary" >button</digi-button>
            <digi-button   type="success" >button</digi-button>
            <digi-button   type="info" >button</digi-button>
            <digi-button   type="warning" >button</digi-button>
            <digi-button   type="danger" >button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="grey" :plain="plain">button</digi-button>
            <digi-button   type="primary" :plain="plain">button</digi-button>
            <digi-button   type="success" :plain="plain">button</digi-button>
            <digi-button   type="info" :plain="plain">button</digi-button>
            <digi-button   type="warning" :plain="plain">button</digi-button>
            <digi-button   type="danger" :plain="plain">button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary" :round="round">button</digi-button>
            <digi-button   type="success" :round="round">button</digi-button>
            <digi-button   type="info" :round="round">button</digi-button>
            <digi-button   type="warning" :round="round">button</digi-button>
            <digi-button   type="danger" :round="round">button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary" >button</digi-button>
            <digi-button   type="success" >button</digi-button>
            <digi-button   type="info" >button</digi-button>
            <digi-button   type="warning" >button</digi-button>
            <digi-button   type="danger" >button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary" :circle="circle">button</digi-button>
            <digi-button   type="success" :circle="circle">button</digi-button>
            <digi-button   type="info" :circle="circle">button</digi-button>
            <digi-button   type="warning" :circle="circle">button</digi-button>
            <digi-button   type="danger" :circle="circle">button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary" :disabled="disabled">button</digi-button>
            <digi-button   type="success" :disabled="disabled">button</digi-button>
            <digi-button   type="info" :disabled="disabled">button</digi-button>
            <digi-button   type="warning" :disabled="disabled">button</digi-button>
            <digi-button   type="danger" :disabled="disabled">button</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary" :loading="loading">loading</digi-button>
        </div>
        <div class="item">
            <digi-button   type="primary btn-lg">loading</digi-button>
            <digi-button   type="primary">loading</digi-button>
            <digi-button   type="primary btn-sm">loading</digi-button>
            <digi-button   type="primary btn-xs">loading</digi-button>
        </div>
      </div>

    </div>
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
