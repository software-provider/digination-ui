<template>
  <div class="demo-main">
    <div class="item">
        <digi-button   type="info"  @click="handleClickDialog">button</digi-button>
    </div>
    <digi-dialog :title="title" width="20%" top="200px" :visible.sync="visible">
      <div>this is message </div>
    </digi-dialog>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'tip',
      visible: false
    }
  },
  methods: {
    handleClickDialog () {
      this.visible = true
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
