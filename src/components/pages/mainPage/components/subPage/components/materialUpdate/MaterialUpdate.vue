<template>
  <div :id="idComponent" class="subcategory">
    <p class="title">{{title}}</p>
    <p class="text">{{text}}</p>
    <!-- <div class="search-dropdown update-input" id="kmat">
      <label>KMAT</label>
      <multiselect
      v-model="valueKmat" :options="optionsKmat"
      :custom-label="customSelectKmat"
      placeholder=""
      label="title" track-by="title"
      :show-labels="false"
      :allow-empty="false"
      @select="onChangeMultiselect($event, 'kmat')">
      </multiselect>
    </div> -->
    <div class="form-group update-input">
      <label for="kmat">KMAT</label>
      <input type="text" class="form-control" id="kmat" v-model="valueKmat">
    </div>
    <!-- <div class="search-dropdown update-input" id="mvm">
      <label>MVM</label>
      <multiselect
      v-model="valueMvm" :options="optionsMvm"
      :custom-label="customSelectMvm"
      placeholder=""
      label="title" track-by="title"
      :show-labels="false"
      :allow-empty="false"
      @select="onChangeMultiselect($event, 'mvm')">
      </multiselect>
    </div> -->
    <div class="form-group update-input">
      <label for="mvm">MVM</label>
      <input type="text" class="form-control" id="mvm" v-model="valueMvm">
    </div>
    <div class="form-group update-input">
      <label for="mnozstvi">MNOZSTVI</label>
      <input type="text" class="form-control" id="mnozstvi" v-model="valueMnozstvi">
    </div>
    <div class="form-group update-input">
      <label for="hmotnost">HMOTNOST</label>
      <input type="text" class="form-control" id="hmotnost" v-model="valueHmotnost">
    </div>
    <div class="confirm-btn">
      <span><button type="button" class="btn btn-primary" @click="confirmFilter">Potvrd</button> {{limitInfo}}</span>
    </div>
    <p class="table container">
      <table class="table table-hover">
        <thead>
          <tr>
          <th>KMAT</th>
          <th>MVM</th>
          <th>MNOZSTVI</th>
          <th>HMOTNOST</th>
          <th>MODIFIKACE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemsMaterialFiltered" :key="item._id" :id="item._id" :index="index"
          @mouseenter="itemOver=index" @mouseleave="itemOver=null">
            <td>
              <span v-if="itemOver === index">
                 <input type="text" class="form-control" v-model="item.kmat" v-on:input="inputChanged(index, item)">
              </span>
              <span v-if="itemOver !== index">{{item.kmat}}</span>
            </td>
            <td>
              <span v-if="itemOver === index">
                 <input type="text" class="form-control" v-model="item.mvm">
              </span>
              <span v-if="itemOver !== index">{{item.mvm}}</span>
            </td>
            <td>
              <span v-if="itemOver === index">
                 <input type="text" class="form-control" v-model="item.mnozstvi">
              </span>
              <span v-if="itemOver !== index">{{item.mnozstvi}}</span>
            </td>
            <td>
              <span v-if="itemOver === index">
                 <input type="text" class="form-control" v-model="item.hmotnost">
              </span>
              <span v-if="itemOver !== index">{{item.hmotnost}}</span>
            </td>
            <td>
              <i class="fa fa-check" aria-hidden="true"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </p>
    <message
      :executed="message.executed"
      :type="message.type"
      :text="message.text"
      :visibilityMessageRef="visibilityMessage"
      v-if="message.show"
    />
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
import Message from '@/components/common/message/Message.vue';

const PagesStore = namespace(PAGES);
const ModeStore = namespace(MODE);
const generalHelper = new GeneralHelper();
const httpService = new HttpService();
const httpMockService = new HttpMockService();

const materialBaseUrl = process.env.VUE_APP_MATERIAL_URL;
const journalFiltersUrl = process.env.VUE_APP_JOURNAL_FILTERS_URL;
const limit = process.env.VUE_APP_JOURNAL_LIMIT;

@Component({
  components: {
    Multiselect,
    Message
  },
  props: {
    title: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    }
  }
})
export default class MaterialUpdate extends Vue {
  idComponent: string = 'materialUpdate';

  valueKmat: any = null;

  valueMvm: any = null;

  valueMnozstvi: any = null;

  valueHmotnost: any = null;

  optionsKmat: any = [];

  optionsMvm: any = [];

  itemsMaterialFiltered: any = [];

  itemsMaterialFilteredOriginal: any = [];

  itemOver: any = null;

  @PagesStore.Getter currentPageSubpage!: Subpage;

  @PagesStore.Getter currentPage!: Page;

  @ModeStore.Action setMode!:
    ({ reference, status }: { reference: Reference, status: AppMode }) => void;

  message: { type: string, text: string, executed: boolean, show: boolean } = {
    type: '',
    text: '',
    executed: false,
    show: false
  };

  created() {
    this.loadMaterialFilterItems();

    // this.value = { title: 'Material0', desc: 'Balik nicoho' };

    // this.options = [
    //   { title: 'Material1', desc: 'Balik klincov' },
    //   { title: 'Material2', desc: 'Balik skrutiek' },
    //   { title: 'Material3', desc: 'Balik tesneni' },
    //   { title: 'Material4', desc: 'Balik podloziek' }
    // ];
  }

  inputChanged(index: any, item: any) {
    debugger;
    if (this.itemsMaterialFilteredOriginal && this.itemsMaterialFilteredOriginal[index]) {
      const itemOriginal = this.itemsMaterialFilteredOriginal[index];
      if (itemOriginal !== item) {
        console.log('changed ', index);
      }
    }
  }

  onChangeMultiselect(event: any, id: any) {
    if (id === 'kmat') {
      this.valueKmat = event;
    } else if (id === 'mvm') {
      this.valueMvm = event;
    }
  }

  confirmFilter() {
    this.loadMaterialItems();
  }

  customSelectKmat({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }

  customSelectMvm({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }

  get currentSubpageTitle(): String {
    return generalHelper.pickDeep(this.currentPageSubpage, ['content', 'title'], '');
  }

  get limitInfo(): String {
    return `current limit: ${limit} items`;
  }

  loadMaterialFilterItems() {
    this.optionsKmat.push({ title: '' });
    this.optionsMvm.push({ title: '' });

    httpService.getDirect(journalFiltersUrl).then((response) => {
      const resData = response.data;
      Object.keys(resData).forEach((key) => {
        for (let i = 0; i < resData[key].length; i++) {
          if (key === 'kmat') {
            this.optionsKmat.push({ title: resData[key][i] });
          } else if (key === 'mvm') {
            this.optionsMvm.push({ title: resData[key][i] });
          }
        }
      });
    }).finally(() => {
      this.optionsKmat = _.orderBy(_.uniqBy(this.optionsKmat, 'title'), ['title'], ['asc']);
      this.optionsMvm = _.orderBy(_.uniqBy(this.optionsMvm, 'title'), ['title'], ['asc']);
      // [this.valueKmat] = this.optionsKmat;
      this.valueKmat = '';
      // [this.valueMvm] = this.optionsMvm;
      this.valueMvm = '';
      this.valueMnozstvi = '';
      this.valueHmotnost = '';
    });
  }

  get generateUrl(): string {
    let queryString = '';
    // if (this.valueKmat && this.valueKmat.title) {
    //   queryString = `${queryString}kmat=${this.valueKmat.title}&`;
    // }
    if (this.valueKmat) {
      queryString = `${queryString}kmat=${this.valueKmat}&`;
    }
    // if (this.valueMvm && this.valueMvm.title) {
    //   queryString = `${queryString}mvm=${this.valueMvm.title}&`;
    // }
    if (this.valueMvm) {
      queryString = `${queryString}mvm=${this.valueMvm}&`;
    }
    if (this.valueMnozstvi) {
      queryString = `${queryString}mnozstvi=${this.valueMnozstvi}&`;
    }
    if (this.valueHmotnost) {
      queryString = `${queryString}hmotnost=${this.valueHmotnost}&`;
    }
    queryString = `${queryString}limit=${limit}&`;
    if (queryString) {
      queryString = `?${queryString}`;
      queryString = queryString.slice(0, -1);
    }
    return `${materialBaseUrl}${queryString}`;
  }

  loadMaterialItems() {
    this.setMode({ reference: REFERENCE_INITIAL, status: MODE_LOADING });
    httpService.getDirect(this.generateUrl).then((response) => {
    // httpMockService.getMockJournalDelay().then((response) => {
      this.messageBoxShow('success');
      this.itemsMaterialFiltered = response.data.materials;
      this.itemsMaterialFilteredOriginal = response.data.materials;
    }, (error) => {
      this.messageBoxShow('error');
      console.log('error ', error);
    }).finally(() => {
      this.setMode({ reference: REFERENCE_INITIAL, status: MODE_LOADED });
      this.messageBoxHide();
    });
  }

  messageBoxShow(type: string) {
    if (type === 'success') {
      this.message.executed = !this.message.executed;
      this.message.text = 'Query executed successfully';
      this.message.type = 'alert-success';
      this.message.show = true;
    } else if (type === 'error') {
      this.message.executed = !this.message.executed;
      this.message.text = 'Query failed';
      this.message.type = 'alert-danger';
      this.message.show = true;
    }
  }

  messageBoxHide() {
    this.message.executed = !this.message.executed;
  }


  visibilityMessage(obj: any) {
    this.message.show = obj.visibility;
  }
}
</script>

<style lang="scss" scoped>
.subcategory {
  .title, .text {
    margin: 10px;
  }
  .update-input {
    margin: 10px;
    float: left;
    width: 80px;
    &#kmat, &#mvm {
      width: 130px;
    }
  }
  .search-dropdown {
    margin: 10px;
    float: left;
    &#kmat, &#mvm {
      width: 120px;
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
