<template>
  <div class="demo-main">
        <div class="item">
            <digi-button   type="info"  @click="handleClickSwitch">button</digi-button>
        </div>
        <div class="item">
            <digi-model-viewer :modelAddress="modelAddress"
                                :poster="poster"
                                :viewWidth="viewWidth"
                                :viewHeight="viewHeight">
            </digi-model-viewer>
        </div>
  </div>

</template>

<script>
import poster from '../assets/logo.png'
export default {
  name: 'Home',
  data () {
    return {
      modelAddress: '',
      width: 300,
      height: 300,
      src: './1.glb',
      viewWidth: '500px',
      viewHeight: '500px',
      poster: poster,
      listglb: [
        { 'url': './1.glb' },
        { 'url': './2.glb' },
        { 'url': './3.glb' }
      ]
    }
  },
  mounted () {
    this.handleClickSwitch()
  },
  methods: {
    handleClickSwitch () {
      let n = 3
      let random_number = Math.floor(Math.random() * Math.floor(n))
      var urlads = this.listglb[random_number].url
      this.modelAddress = urlads
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
