<template>
<div id="loader" class="container-fluid h-100">
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12">
      <div class="spinner-border text-primary"></div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  props: {
  }
})
export default class Loader extends Vue {
}
</script>

<style lang="scss" scoped>
#loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #2d2d2d3d;
}
</style>
