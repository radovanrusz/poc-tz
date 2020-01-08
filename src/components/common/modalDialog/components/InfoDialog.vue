<template>
<transition name="modal">
 <div class="modal modal-mask" style="display: block">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          Complete edit process
        </h4>
      </div>
      <div class="modal-body">
        Please
        <button type="button" class="btn btn-light btn-sm border-dark btn-item">
          <i class="fa fa-check" aria-hidden="true"></i>
        </button> save or
        <button type="button" class="btn btn-light btn-sm border-dark btn-item">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button> cancel changes for input you edited.
      </div>
      <div class="modal-footer">
        <button class="btn btn-info" @click="hideModal">
          Close dialog
        </button>
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MODE } from '@/stores/constants';
import { AppMode, Reference } from '@/stores/mode/mode.types';

const ModeStore = namespace(MODE);

@Component({
  components: {},
  props: {
    msg: {
      required: false,
      type: String
    },
    showModalRef: {
      required: true,
      type: Function
    }
  }
})
export default class InfoDialog extends Vue {
  msg!: string;

  showModalRef!: any;

  @ModeStore.Getter modeStatus!: AppMode;

  @ModeStore.Getter modeReference!: Reference;

  hideModal() {
    this.showModalRef();
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
</style>
