<template>
  <div aria-live="polite" aria-atomic="true" class="toast-container">
    <TransitionGroup name="toast" tag="div" appear>
      <div
        v-for="item in messages"
        :key="item.id"
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        @mouseover="pauseProgress(item)"
        @mouseout="resumeProgress(item)"
      >
      <div class="cl-main">
       <div class="cl-left">
            <span  :class="getIconClass(item)" > </span>
       </div>
       <div class="cl-right">

             <div class="cl-title" :class="'state-' + item.type"  >{{getState(item.type)}}</div>
             <div class="toast-body">{{ item.message }}</div>
       </div>
      </div>
          <span v-if="item.closeable" class="close"  @click="remove(item)"></span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { EventBus } from './event-bus'

export default {
  name: 'DigiToasts',
  props: {
    showProgress: {
      type: Boolean,
      default: true
    },
    rtl: {
      type: Boolean,
      default: false
    },
    maxMessages: {
      type: Number,
      default: 5
    },
    timeOut: {
      type: Number,
      default: 3000
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      messages: [],
      count: 0
    }
  },
  created () {
    // start listening for "toast-message" channel's events
    EventBus.$on('toast-message', this.handleMessageEvent)
  },
  methods: {
    getState (type) {
      if (type === 'danger') {
        type = 'error'
      }
      return type
    },
    /**
     * Handle a message event.
     *
     * @param {object} payload
     */
    handleMessageEvent (payload) {
      if (payload.message) {
        this.addMessage(payload.message, payload.type, payload.options)
      }
    },

    /**
     * Add a message to the list.
     *
     * @param {string} message
     * @param {string} type
     */
    addMessage (message, type, options = {}) {
      // message object data
      var messageData = {
        id: this.count++,
        message: message,
        type: type,
        showProgress: this.showProgress,
        timeOut: this.timeOut,
        closeable: this.closeable,
        rtl: this.rtl,
        progress: 0,
        paused: false,
        animationFrame: null
      }

      // merge custom options
      messageData = Object.assign({}, messageData, options)

      // prepend new message to front of messages's array
      this.messages.unshift(messageData)

      // check if maximum messages to store has been reached
      if (this.messages.length > this.maxMessages) {
        // remove from the end
        this.messages.splice(this.maxMessages)
      }

      if (messageData.timeOut > 0) {
        // start message timeout
        this.startTimeout(messageData)
      }
    },

    /**
     * Start progress bar.
     * @param startTime {number}
     * @default 0
     */
    startTimeout (messageData, startFrom = 0) {
      const self = this

      // performance.now() will give more precision to be used for a smooth prograss bar
      const startTime = performance.now()

      const start = () => {
        // start animation calculating
        messageData.animationFrame = requestAnimationFrame(timestamp => {
          const timeElapsed = timestamp + startFrom - startTime

          // check if is message object already was removed
          // or prograss a toast message was hovered on
          if (!self.exists(messageData) || messageData.paused) {
            // cancel the animation
            cancelAnimationFrame(messageData.animationFrame)

            // check if timout value has not been reached
          } else if (timeElapsed < messageData.timeOut) {
            // calcalute the prograss
            const progress = timeElapsed / messageData.timeOut
            // set a new progress
            messageData.progress = progress
            // continue calculating the progress
            start()
          } else {
            // timout has been reached
            messageData.progress = 1
            // cancel the animation
            cancelAnimationFrame(messageData.animationFrame)
            // remove message from array
            self.remove(messageData)
          }
        })
      }

      start()
    },

    /**
     * Pause prograss bar when hovering on a toast.
     *
     * @param {object} messageData
     */
    pauseProgress (messageData) {
      if (messageData.timeOut <= 0) return

      messageData.paused = true
    },

    /**
     * Resume prograss bar when going a way from 'mouseover' status.
     *
     * @param {object} messageData
     */
    resumeProgress (messageData) {
      if (messageData.timeOut <= 0) return

      messageData.paused = false

      // re-start animation calculating with a given start point
      this.startTimeout(
        messageData,
        messageData.timeOut * messageData.progress
      )
    },

    /**
     * Get current message prograss.
     *
     * @param {object} messageData
     */
    getCurrentProgress (messageData) {
      // set prograss to "100" when progress value is close to 100.
      // why? sometimes when a prograss is someting like (99.899)
      // it will show a little empty space at the end of prograss
      // bar which doesnt get filled.
      if (Math.round(messageData.progress * 100) === 100) {
        return 100
      }
      return messageData.progress * 100
    },

    /**
     * Get icon class based on type and layout.
     *
     * @param {object} messageData
     */
    getIconClass (messageData) {
      var iconClass = 'toast-icon-' + messageData.type

      if (messageData.rtl) {
        return 'icon-right ' + iconClass
      }
      return 'icon-left ' + iconClass
    },

    /**
     * Remove a message from the list.
     *
     * @param {number} id
     */
    remove (messageData) {
      const index = this.messages.findIndex(
        message => message.id === messageData.id
      )

      this.messages.splice(index, 1)
    },

    /**
     * Remove a message from the list.
     *
     * @param {number} id
     */
    exists (messageData) {
      const index = this.messages.findIndex(
        message => message.id === messageData.id
      )

      if (index === -1) {
        return false
      }

      return true
    }
  }
}
</script>

<style scoped lang="scss">
 .bg-success{
  background-color:#ffffff!important
}

.bg-info{
  background-color:#ffffff!important
}

.bg-warning{
  background-color:#ffffff!important
}

.bg-danger{
  background-color:#ffffff!important
}

$toast-font-size: .875rem;
$toast-background-color: rgba(255,255,255,.85);
$toast-border-width: 1px;
$toast-border-color: rgba(0,0,0,.1);
$toast-box-shadow:0 0.25rem 0.75rem rgb(0 0 0 / 10%);
$toast-padding-x: 0.5rem;

.cl-main {
    display: flex;
    .cl-left {
        width: 55px;
        span {
            width: 53px;
            height: 58px;
            display: block;
        }
    }
    .cl-right {
        text-align: left;
        margin-left: 28px;
        .cl-title {
            width: 99px;
            height: 29px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;

            margin-bottom: 8px;
             &.state-success{
               color:rgba(3, 166, 90, 1)!important
            }
            &.state-info{
               color:#0e0d0d!important
            }

            &.state-warning{
               color:#e6d821!important
            }

            &.state-danger{
               color:rgba(252, 46, 32, 1)!important
            }
        }
        .toast-body {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            color: rgba(84, 89, 94, 0.6);
            background: #ffffff;
        }
    }
}
.toast {
  overflow: hidden;
  font-size: $toast-font-size;
  background-color: $toast-background-color;
  background-clip: padding-box;
  border: $toast-border-width solid $toast-border-color;
  box-shadow: $toast-box-shadow;
  backdrop-filter: blur(10px);
  opacity: 0;
  border-radius: 8px;
  width: 463px;
//   height: 57px;
  padding: 36px 40px;
  background: #ffffff;

  &:not(:last-child) {
    margin-bottom: $toast-padding-x;
  }

  &.showing {
    opacity: 1;
  }

  &.show {
    display: block;
    opacity: 1;
  }

  &.hide {
    display: none;
  }
}
$toast-padding-y: .25rem;
$toast-padding-x: .75rem;
$toast-header-color:#6c757d;
$toast-header-background-color:rgba(255,255,255,.85);
$toast-border-width:1px;
$toast-header-border-color:rgba(0,0,0,.05);

.toast-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $toast-padding-y $toast-padding-x;
  color: $toast-header-color;
  background-color: $toast-header-background-color;
  background-clip: padding-box;
  border-bottom: $toast-border-width solid $toast-header-border-color;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  background: url("../../assets/img/toasts/close.png")#fff;
  display: block;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor:pointer;
}
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 350px;
  z-index: 1090;
}
.toast-icon {
  position: absolute;
  width: 22px;
  height: 22px;
  transform: translateY(-50%);
}
.icon-right {
  right: 10px;
}
.icon-left {
  left: 10px;
}
.toast-icon-success {
  background: url('../../assets/img/toasts/success.png') no-repeat;
}
.toast-icon-danger {
  background: url('../../assets/img/toasts/error.png') no-repeat;
}
.toast-icon-warning {
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.561 78.561"%3E%3Cg fill="%234c4c4c"%3E%3Ccircle cx="39.28" cy="57.772" r="3.632"/%3E%3Cpath d="M38.792 48.347a2 2 0 0 0 2-2v-19a2 2 0 0 0-4 0v19a2 2 0 0 0 2 2z"/%3E%3Cpath d="M46.57 11.542l-.091-.141c-1.852-2.854-3.766-5.806-7.199-5.806-3.578 0-5.45 2.994-7.26 5.891l-.074.119L.278 65.266c-.182.308-.278.469-.278.826 0 3.896 3.135 6.874 6.988 6.874h64.585c3.854 0 6.988-2.979 6.988-6.874 0-.357-.096-.614-.277-.921L46.57 11.542zm25.003 57.424H6.988c-1.461 0-2.717-.951-2.95-2.394l31.374-53.061c1.554-2.487 2.572-3.963 3.868-3.963 1.261 0 2.457 1.87 3.843 4.006l31.399 53.007c-.232 1.442-1.488 2.405-2.949 2.405z"/%3E%3C/g%3E%3C/svg%3E') no-repeat;
}
.toast-icon-info {
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65"%3E%3Cg fill="%234c4c4c"%3E%3Cpath d="M32.5 0C14.58 0 0 14.579 0 32.5S14.58 65 32.5 65 65 50.421 65 32.5 50.42 0 32.5 0zm0 61C16.785 61 4 48.215 4 32.5S16.785 4 32.5 4 61 16.785 61 32.5 48.215 61 32.5 61z"/%3E%3Ccircle cx="33.018" cy="19.541" r="3.345"/%3E%3Cpath d="M32.137 28.342a2 2 0 0 0-2 2v17a2 2 0 0 0 4 0v-17a2 2 0 0 0-2-2z"/%3E%3C/g%3E%3C/svg%3E') no-repeat;
}
.toast-enter {
  opacity: 0.5 !important;
}
.toast-enter-active {
  transition: opacity 0.5s ease-in;
}
.toast-enter-to {
  opacity: 1;
}
.toast-leave {
  opacity: 0.5;
}
.toast-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
.toast-leave-to {
  opacity: 0;
}
</style>
