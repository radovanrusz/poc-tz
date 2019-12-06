<template>
<div id="message" class="container">
  <div class="alert" v-bind:class="type">
    <button type="button" class="close" @click="closeMessage">&times;</button>
      {{text}}
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator';

@Component({
  components: {},
  props: {
    executed: {
      required: true,
      type: Boolean
    },
    type: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    visibilityMessageRef: {
      required: true,
      type: Function
    }
  }
})
export default class Message extends Vue {
  visibilityMessageRef!: any;

  messageBoxTimeout: any = null;

  @Watch('executed', { immediate: true, deep: true }) onExecuted() {
    if (this.messageBoxTimeout) {
      clearTimeout(this.messageBoxTimeout);
    }
    this.messageBoxTimeout = setTimeout(() => {
      this.closeMessage();
    }, 5000);
  }


  closeMessage() {
    if (this.messageBoxTimeout) {
      clearTimeout(this.messageBoxTimeout);
    }
    this.visibilityMessageRef({ visibility: false });
  }
}
</script>

<style lang="scss" scoped>
#message {
  float: left;
}
</style>
