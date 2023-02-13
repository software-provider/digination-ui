<template>
  <div class="vue-model-viewer"
       id="vue-model-viewer"
       v-html="renderModela">
  </div>
</template>
<script>
import '@google/model-viewer'
// import '@google/model-viewer/dist/model-viewer'
export default {
  name: 'DigiModelViewer',
  props: {
    modelAddress: {
      type: String,
      default: ''
    },
    viewWidth: {
      type: String,
      default: '300px'
    },
    poster: {
      type: String,
      default: ''
    },
    viewHeight: {
      type: String,
      default: '300px'
    },
    isAutoPlay: {
      type: Boolean,
      default: true
    },
    isDisableZoom: {
      type: Boolean,
      default: true
    },
    modelId: {
      type: String,
      default: 'viewer-display'
    },
    modelClass: {
      type: String,
      default: 'viewer-display'
    },
    interactionPrompt: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    renderModela () {
      return `<model-viewer style="width: ${this.viewWidth};height: ${this.viewHeight};" interaction-prompt="${this.interactionPrompt}"  autoplay="${this.isAutoPlay}" camera-controls="true" animation-name="Run" interpolation-decay="200" max-camera-orbit="auto 75deg auto" min-camera-orbit="auto 75deg auto"  disable-zoom="${this.isDisableZoom}" id="${this.modelId}" class="${this.modelClass}" poster="${this.poster}" src="${this.modelAddress}" ar-status="not-presenting"></model-viewer>`
    }
  }
}

</script>
