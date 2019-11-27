<template>
  <div class="top-menu shadow rounded" :id="idComponent">
    <button
    v-for="(item, index) in itemsPages" :key="item.id" :index="index"
    type="button" class="btn" v-bind:class="currentPageId === item.id ? 'btn-success' : 'btn-primary'"
    @click="selectPage(item.id)">{{item.name}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { PAGES } from '@/stores/constants';
import { Page } from '@/stores/pages/pages.types';
import { GeneralHelper } from '@/helpers/general.helper';

const PagesStore = namespace(PAGES);
const generalHelper = new GeneralHelper();

@Component({
  components: {},
  props: {
  }
})
export default class TopMenu extends Vue {
  idComponent: string = 'topMenu';

  @PagesStore.Getter pages!: Page[];

  @PagesStore.Getter currentPage!: Page;

  @PagesStore.Action setCurrentPage!: (id: String) => void;

  get itemsPages(): Page[] {
    return this.pages;
  }

  get currentPageId(): String {
    return generalHelper.pickDeep(this.currentPage, ['id'], '');
  }

  selectPage(itemId: String) {
    const currentPageId = generalHelper.pickDeep(this.currentPage, ['id'], '');
    if (itemId !== currentPageId) {
      this.setCurrentPage(itemId);
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  background: #e4e4e4;
  float: left;
  .btn {
    margin: 10px;
  }
}
</style>
