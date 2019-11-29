<template>
  <div class="sub-page shadow rounded text-left" :id="idComponent">
    <div :id="currentSubpageId">
      <p class="title">{{currentSubpageTitle}}</p>
      <p class="text">{{currentSubpageText}}</p>
      <div v-if="currentSubpageFilterTable">
        <p class="search-dropdown" id="kmat">
          <label>KMAT</label>
          <multiselect
            v-model="valueKmat" :options="optionsKmat"
            :custom-label="customSelectKmat"
            placeholder="Zvolte KMAT"
            label="title" track-by="title"
            :show-labels="false"
            :allow-empty="false"
            @select="onChangeMultiselect($event, 'kmat')">
          </multiselect>
        </p>
        <p class="search-dropdown" id="mvm1">
          <label>MVM1</label>
          <multiselect
            v-model="valueMvm1" :options="optionsMvm1"
            :custom-label="customSelectMvm1"
            placeholder="Zvolte MVM1"
            label="title" track-by="title"
            :show-labels="false"
            :allow-empty="false"
            @select="onChangeMultiselect($event, 'mvm1')">
          </multiselect>
        </p>
        <p class="search-dropdown" id="mvm2">
          <label>MVM2</label>
          <multiselect
            v-model="valueMvm2" :options="optionsMvm2"
            :custom-label="customSelectMvm2"
            placeholder="Zvolte MVM2"
            label="title" track-by="title"
            :show-labels="false"
            :allow-empty="false"
            @select="onChangeMultiselect($event, 'mvm2')">
          </multiselect>
        </p>
        <div class="confirm-btn">
          <span><button type="button" class="btn btn-primary" @click="confirmFilter">Potvrd</button> {{limitInfo}}</span>
        </div>
        <p class="table container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>KMAT</th>
                <th>MNOZSTVI</th>
                <th>HMOTNOST</th>
                <th>MVM1</th>
                <th>MVM2</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in itemsJournalFiltered" :key="item._id" :id="item._id" :index="index">
                <td>{{item.kmat}}</td>
                <td>{{item.mnozstvi}}</td>
                <td>{{item.hmotnost}}</td>
                <td>{{item.mvm1}}</td>
                <td>{{item.mvm2}}</td>
              </tr>
            </tbody>
          </table>
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

const PagesStore = namespace(PAGES);
const ModeStore = namespace(MODE);
const generalHelper = new GeneralHelper();
const httpService = new HttpService();
const httpMockService = new HttpMockService();

const journalBaseUrl = 'https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/journal';
const journalBaseUrlLocal = 'http://localhost:3000/journal';
const journalFiltersUrlLocal = 'http://localhost:3000/initialjournalFilters';
const journalFiltersUrl = 'https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/initialjournalFilters';
const limit = '20';

@Component({
  components: {
    Multiselect
  },
  props: {
  }
})
export default class SubPage extends Vue {
  idComponent: string = 'subPage';

  valueKmat: any = null;

  valueMvm1: any = null;

  valueMvm2: any = null;

  optionsKmat: any = [];

  optionsMvm1: any = [];

  optionsMvm2: any = [];

  itemsJournal: any = [];

  itemsJournalFiltered: any = [];

  itemsJournalFilteredKmat: any = [];

  itemsJournalFilteredMvm1: any = [];

  itemsJournalFilteredMvm2: any = [];

  @PagesStore.Getter currentPageSubpage!: Subpage;

  @ModeStore.Action setMode!:
    ({ reference, status }: { reference: Reference, status: AppMode }) => void;

  created() {
    this.loadJournalFilterItems();

    // this.loadJournalItems();

    // this.value = { title: 'Material0', desc: 'Balik nicoho' };

    // this.options = [
    //   { title: 'Material1', desc: 'Balik klincov' },
    //   { title: 'Material2', desc: 'Balik skrutiek' },
    //   { title: 'Material3', desc: 'Balik tesneni' },
    //   { title: 'Material4', desc: 'Balik podloziek' }
    // ];
  }

  // onChangeMultiselect(event: any, { id, value }:{ id: any, value: any }) {
  onChangeMultiselect(event: any, id: any) {
    debugger;
    if (id === 'kmat') {
      this.valueKmat = event;
    } else if (id === 'mvm1') {
      this.valueMvm1 = event;
    } else if (id === 'mvm2') {
      this.valueMvm2 = event;
    }
  }

  confirmFilter() {
    debugger;
    this.loadJournalItems();
  }

  customSelectKmat({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }

  customSelectMvm1({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }

  customSelectMvm2({ title }: { title: string }): string {
    return title ? `${title}` : '';
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

  get currentSubpageFilterTable(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['content', 'filterTable'], false);
  }

  get limitInfo(): String {
    return `current limit: ${limit} items`;
  }

  loadJournalFilterItems() {
    debugger;
    this.optionsKmat.push({ title: '' });
    this.optionsMvm1.push({ title: '' });
    this.optionsMvm2.push({ title: '' });

    httpService.getDirect(journalFiltersUrl).then((response) => {
      debugger;
      const resData = response.data;
      Object.keys(resData).forEach((key) => {
        for (let i = 0; i < resData[key].length; i++) {
          if (key === 'kmat') {
            this.optionsKmat.push({ title: resData[key][i] });
          } else if (key === 'mvm1') {
            this.optionsMvm1.push({ title: resData[key][i] });
          } else if (key === 'mvm2') {
            this.optionsMvm2.push({ title: resData[key][i] });
          }
        }
      });
    }).finally(() => {
      this.optionsKmat = _.orderBy(_.uniqBy(this.optionsKmat, 'title'), ['title'], ['asc']);
      this.optionsMvm1 = _.orderBy(_.uniqBy(this.optionsMvm1, 'title'), ['title'], ['asc']);
      this.optionsMvm2 = _.orderBy(_.uniqBy(this.optionsMvm2, 'title'), ['title'], ['asc']);
      [this.valueKmat] = this.optionsKmat;
      [this.valueMvm1] = this.optionsMvm1;
      [this.valueMvm2] = this.optionsMvm2;
    });
  }

  get generateUrl(): string {
    let queryString = '';
    if (this.valueKmat.title) {
      queryString = `${queryString}kmat=${this.valueKmat.title}&`;
    }
    if (this.valueMvm1.title) {
      queryString = `${queryString}mvm1=${this.valueMvm1.title}&`;
    }
    if (this.valueMvm2.title) {
      queryString = `${queryString}mvm2=${this.valueMvm2.title}&`;
    }
    queryString = `${queryString}limit=${limit}&`;
    if (queryString) {
      queryString = `?${queryString}`;
      queryString = queryString.slice(0, -1);
    }
    return `${journalBaseUrl}${queryString}`;
  }

  loadJournalItems() {
    let status = MODE_LOADING;
    const reference = REFERENCE_INITIAL;
    this.setMode({ reference, status });
    httpService.getDirect(this.generateUrl).then((response) => {
    // httpMockService.getMockJournalDelay().then((response) => {
      this.itemsJournalFiltered = response.data;
    }, (error) => {
      console.log('error ', error);
    }).finally(() => {
      status = MODE_LOADED;
      this.setMode({ reference, status });
    });
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
  .search-dropdown {
    margin: 10px;
    float: left;
    &#kmat, &#mvm1, &#mvm2{
      width: 100px;
    }
  }
  .table {
    float: left;
  }
  .confirm-btn {
    float: left;
    width: 250px;
    position: relative;
    height: 100px;
    span {
      position: absolute;
      bottom: 20px;
    }
  }
}
</style>
