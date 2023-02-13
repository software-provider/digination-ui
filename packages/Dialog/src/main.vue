<template>
  <transition name="dialog-fade">
    <div class="digi-dialog__wrapper" v-show="visible" @click.self="handleClose">
      <div class="digi-dialog" :style="{width, marginTop: top}">
        <div class="digi-dialog__header ">
          <slot name="title">
            <span class="digi-dialog__title">{{title}}</span>
          </slot>
          <a class="digi-dialog__headerbtn" @click="handleClose">
            <!-- <i class="iconfont icon-close-circle" style="color: rgb(212,212,215); font-size: 2.5rem;"></i> -->
              <img :src="closeIco">
          </a>
        </div>
        <div class="digi-dialog__body">
          <slot></slot>
        </div>
        <div class="digi-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

import closeMode from '../../assets/img/close.png'

export default {
  name: 'DigiDialog',
  props: {
    title: {
      type: String,
      default: 'info'
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    closeIco: {
      type: String,
      default: closeMode
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.digi-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0, .5);

  .digi-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #23262f;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 30%;
    border-radius: 18px;
    .digi-dialog__header{
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      align-items: center;
      .digi-dialog__title {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #FCFCFD
      }
      .digi-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 0 1.5rem 1.5rem 1.5rem;
      color: #FCFCFD;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      ::v-deep .hm-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: fade .3s;
}

.dialog-fade-leave-active {
  animation: fade .3s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
