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
    debugger;

    this.loadJournalItems();

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
    let resJournal: any[] = [];
    if (id === 'kmat') {
      if (!event.title) {
        this.itemsJournalFilteredKmat = this.itemsJournal.map((item: any) => item._id);
      } else {
        this.itemsJournalFilteredKmat = this.itemsJournal.filter((item: any) => item.kmat === event.title).map((item: any) => item._id);
      }
    } else if (id === 'mvm1') {
      if (!event.title) {
        this.itemsJournalFilteredMvm1 = this.itemsJournal.map((item: any) => item._id);
      } else {
        this.itemsJournalFilteredMvm1 = this.itemsJournal.filter((item: any) => item.mvm1 === event.title).map((item: any) => item._id);
      }
    } else if (id === 'mvm2') {
      if (!event.title) {
        this.itemsJournalFilteredMvm2 = this.itemsJournal.map((item: any) => item._id);
      } else {
        this.itemsJournalFilteredMvm2 = this.itemsJournal.filter((item: any) => item.mvm2 === event.title).map((item: any) => item._id);
      }
    }
    resJournal = _.intersection(this.itemsJournalFilteredKmat, this.itemsJournalFilteredMvm1, this.itemsJournalFilteredMvm2);
    this.itemsJournalFiltered = generalHelper.getItemsObjBasedArrayIds(resJournal, this.itemsJournal);
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

  loadJournalItems() {
    debugger;
    this.optionsKmat.push({ title: '' });
    this.optionsMvm1.push({ title: '' });
    this.optionsMvm2.push({ title: '' });
    let status = MODE_LOADING;
    const reference = REFERENCE_INITIAL;
    this.setMode({ reference, status });
    // httpService.getDirect('https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/journal').then((response) => {
    httpMockService.getMockJournalDelay().then((response) => {
      debugger;
      this.itemsJournal = response;
      this.itemsJournalFiltered = response;
      // this.itemsJournal = response.data;
      // this.itemsJournalFiltered = response.data;
      for (let i = 0; i < this.itemsJournal.length; i++) {
        this.optionsKmat.push({ title: this.itemsJournal[i].kmat });
        this.optionsMvm1.push({ title: this.itemsJournal[i].mvm1 });
        this.optionsMvm2.push({ title: this.itemsJournal[i].mvm2 });
      }
      this.optionsKmat = _.orderBy(_.uniqBy(this.optionsKmat, 'title'), ['title'], ['asc']);
      this.optionsMvm1 = _.orderBy(_.uniqBy(this.optionsMvm1, 'title'), ['title'], ['asc']);
      this.optionsMvm2 = _.orderBy(_.uniqBy(this.optionsMvm2, 'title'), ['title'], ['asc']);
      [this.valueKmat] = this.optionsKmat;
      [this.valueMvm1] = this.optionsMvm1;
      [this.valueMvm2] = this.optionsMvm2;
      this.itemsJournalFilteredKmat = this.itemsJournalFiltered.map((item: any) => item._id);
      this.itemsJournalFilteredMvm1 = this.itemsJournalFiltered.map((item: any) => item._id);
      this.itemsJournalFilteredMvm2 = this.itemsJournalFiltered.map((item: any) => item._id);
    }, (error) => {
      console.log('error ', error);
    }).finally(() => {
      debugger;
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
}
</style>
