<template>
  <div class="sub-page shadow rounded text-left" :id="idComponent">
    <div :id="currentSubpageId">
      <p class="title">{{currentSubpageTitle}}</p>
      <p class="text">{{currentSubpageText}}</p>
      <div v-if="currentPageId === 'pwhjj' && currentSubpageJournalFilterTable">
        <journal-review />
      </div>
      <div v-if="currentPageId === 'rm'">
        Registrace materialu
        <p>
          <button type="button" class="btn btn-primary" @click="putNewId">Put new id test</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import Multiselect from 'vue-multiselect';
import { namespace } from 'vuex-class';
import { PAGES, MODE } from '@/stores/constants';
import { Page, Subpage } from '@/stores/pages/pages.types';
import { GeneralHelper } from '@/helpers/general.helper';
import { HttpMockService, HttpService } from '@/services/http.service';
import { Reference, AppMode } from '@/stores/mode/mode.types';
import { MODE_LOADING, REFERENCE_INITIAL, MODE_LOADED } from '@/stores/mode/constants';
import JournalReview from './components/journalReview/JournalReview.vue';

const PagesStore = namespace(PAGES);
const ModeStore = namespace(MODE);
const generalHelper = new GeneralHelper();
const httpService = new HttpService();
const httpMockService = new HttpMockService();

const journalBaseUrl = process.env.VUE_APP_JOURNAL_URL;
const journalBaseUrlLocal = process.env.VUE_APP_JOURNAL_URL_LOCAL;
const journalFiltersUrl = process.env.VUE_APP_JOURNAL_FILTERS_URL;
const journalFiltersUrlLocal = process.env.VUE_APP_JOURNAL_FILTERS_URL_LOCAL;
const limit = process.env.VUE_APP_JOURNAL_LIMIT;
const material = process.env.VUE_APP_MATERIAL_URL;

@Component({
  components: {
    JournalReview
  },
  props: {
  }
})
export default class SubPage extends Vue {
  idComponent: string = 'subPage';

  @PagesStore.Getter currentPageSubpage!: Subpage;

  @PagesStore.Getter currentPage!: Page;

  putNewId() {
    debugger;
    const idParam = 'kmat=11111';
    const dataObj = { hmotnost: 660 };
    httpService.putDirect(`${material}?${idParam}`, dataObj).then((response) => {
      debugger;
    });
  }

  get currentPageId(): String {
    return generalHelper.pickDeep(this.currentPage, ['id'], '');
  }

  get currentSubpageTitle(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['content', 'title'], '');
  }

  get currentSubpageText(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['content', 'text'], '');
  }

  get currentSubpageId(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['id'], '');
  }

  get currentSubpageJournalFilterTable(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['content', 'filterTable'], false);
  }
}
</script>

<style lang="scss" scoped>
.sub-page {
  background: #f8f9fa;
  float: left;
  margin: 20px 0;
  width: inherit;
  min-height: 500px;
  .title, .text {
    margin: 10px;
  }
}
</style>
