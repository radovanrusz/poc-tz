<template>
  <div class="left-menu shadow rounded text-left" :id="idComponent">
    <button
    v-for="(item, index) in itemsPages" :key="item.id" :index="index"
    type="button" class="btn" v-bind:class="currentSubpageId === item.id ? 'btn-secondary' : 'btn-light'"
    @click="selectSubpage(item.id)"><i class="fa fa-caret-right" aria-hidden="true"></i> {{item.name}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { PAGES } from '@/stores/constants';
import { Page, Subpage } from '@/stores/pages/pages.types';
import { GeneralHelper } from '@/helpers/general.helper';
import SubPage from '@/components/pages/mainPage/components/subPage/SubPage.vue';

const PagesStore = namespace(PAGES);
const generalHelper = new GeneralHelper();

@Component({
  components: {},
  props: {
  }
})
export default class LeftMenu extends Vue {
  idComponent: string = 'leftMenu';

  // @PagesStore.Getter pages!: Page[];

  @PagesStore.Getter currentPage!: Page;

  @PagesStore.Getter currentPageSubpage!: SubPage;

  @PagesStore.Action setCurrentPageSubpage!: (id: String) => void;

  get itemsPages(): Subpage[] {
    return this.currentPage.subpages;
  }

  get currentSubpageId(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['id'], '');
  }

  selectSubpage(itemId: String) {
    const currentSubpageId = generalHelper.pickDeep(this.currentPageSubpage, ['id'], '');
    if (itemId !== currentSubpageId) {
      this.setCurrentPageSubpage(itemId);
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  background: #e4e4e4;
  float: left;
  margin: 20px 0;
  .btn {
    padding: 10px;
    width: 100%;
    text-align: left;
  }
}
</style>
