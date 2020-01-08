<template>
  <info-dialog v-if="showModal" :showModalRef="showModalHandle"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MODE } from '@/stores/constants';
import { AppMode, Reference } from '@/stores/mode/mode.types';
import InfoDialog from './components/InfoDialog.vue';
import { MODE_INCOMPLETE, MODE_READ, MODE_EDIT } from '@/stores/mode/constants';

const ModeStore = namespace(MODE);

@Component({
  components: {
    InfoDialog
  },
  props: {}
})
export default class ModalDialog extends Vue {
  @ModeStore.Getter modeStatus!: AppMode;

  @ModeStore.Getter modeReference!: Reference;

  @ModeStore.Action setMode!:
    ({ reference, status }: { reference: Reference, status: AppMode }) => void;

  showModalHandle() {
    if (this.modeStatus === MODE_INCOMPLETE) {
      const status = MODE_EDIT;
      const reference = { id: this.modeReference.id, text: this.modeReference.text };
      this.setMode({ reference, status });
      this.scrollToRelevantItem(this.modeReference.id);
    }
  }

  scrollToRelevantItem(id: string) {
    const el = document.getElementById(id);
    if (el) {
      (el as HTMLElement).scrollIntoView();
      (el.querySelector('textarea') as HTMLElement).focus();
    }
  }

  get appModeStatus(): string {
    return `${this.modeStatus} ooo`;
  }

  get showModal(): boolean {
    return this.modeStatus === MODE_INCOMPLETE;
  }
}
</script>

<style lang="scss" scoped>
</style>
