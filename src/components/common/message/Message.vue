<template>
<div id="message" class="container">
  <div class="alert" v-bind:class="msgType">
    <button type="button" class="close" @click="closeMessage">&times;</button>
      {{text}}
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  props: {
    msgType: {
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

  closeMessage() {
    this.visibilityMessageRef({ visibility: false });
  }
}
</script>

<style lang="scss" scoped>
#message {
  float: left;
}
</style>
