<template>
  <div :id="idComponent" class="subcategory">
    <p class="title">{{title}}</p>
    <p class="text">{{text}}</p>
    <div class="form-group reg-input">
      <label for="kmat">KMAT</label>
      <input type="text" class="form-control" id="kmat" v-model="regKmat">
    </div>
    <div class="form-group reg-input">
      <label>MVM</label>
      <multiselect
      v-model="regMvm" :options="optionsMvm"
      :custom-label="customSelectMvm1"
      placeholder=""
      label="title" track-by="title"
      :show-labels="false"
      :allow-empty="false"
      @select="onChangeMultiselect($event, 'mvm1')">
      </multiselect>
    </div>
    <div class="form-group reg-input">
      <label for="mnozstvi">MNOZSTVI</label>
      <input type="text" class="form-control" id="mnozstvi" v-model="regMnozstvi">
    </div>
    <div class="form-group reg-input">
      <label for="hmotnost">HMOTNOST</label>
      <input type="text" class="form-control" id="hmotnost" v-model="regHmotnost">
    </div>
    <p class="confirm-btn">
      <span><button type="button" class="btn btn-primary" @click="putNewId">Registrovat</button></span>
    </p>
    <!-- <p class="confirm-btn">
      <span><button type="button" class="btn btn-primary" @click="putExistingId">Update</button></span>
    </p> -->
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

const material = process.env.VUE_APP_MATERIAL_URL;

@Component({
  components: {
    Multiselect
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
export default class MaterialRegistration extends Vue {
  idComponent: string = 'materialRegistration';

  regKmat: any = null;

  regMvm: any = null;

  regMnozstvi: any = null;

  regHmotnost: any = null;

  optionsMvm: any = [];

  @ModeStore.Action setMode!:
    ({ reference, status }: { reference: Reference, status: AppMode }) => void;

  created() {
    this.loadMaterialMvmItems();
  }

  putNewId() {
    debugger;
    const dataObj = {
      hmotnost: 121,
      kmat: '11114',
      mnozstvi: 10,
      mvm: '201912051955'
    };
    httpService.putDirect(material, dataObj).then((response) => {
      debugger;
    });
  }

  putExistingId() {
    const idParam = 'id=2';
    const dataObj = { hmotnost: 120, mnozstvi: 11 };
    httpService.putDirect(`${material}?${idParam}`, dataObj).then((response) => {
      debugger;
    });
  }

  loadMaterialMvmItems() {
    debugger;
    this.optionsMvm.push({ title: '' });

    this.setMode({ reference: REFERENCE_INITIAL, status: MODE_LOADING });
    // httpService.getDirect(this.generateUrl).then((response) => {
    httpMockService.getMockDataMaterialMvm1Delay().then((response) => {
      debugger;
      const resData: any = response;
      Object.keys(resData).forEach((key) => {
        for (let i = 0; i < resData[key].length; i++) {
          if (key === 'mvm1') {
            this.optionsMvm.push({ title: resData[key][i] });
          }
        }
      });
      // this.messageBoxShow('success');
      // this.itemsJournalFiltered = response.data;
    }, (error) => {
      // this.messageBoxShow('error');
      console.log('error ', error);
    }).finally(() => {
      this.setMode({ reference: REFERENCE_INITIAL, status: MODE_LOADED });
      // this.messageBoxHide();
      this.optionsMvm = _.orderBy(_.uniqBy(this.optionsMvm, 'title'), ['title'], ['asc']);
      [this.regMvm] = this.optionsMvm;
    });
  }

  onChangeMultiselect(event: any, id: any) {
    if (id === 'mvm1') {
      this.regMvm = event;
    }
  }

  customSelectMvm1({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }
}
</script>

<style lang="scss" scoped>
.subcategory {
  .title, .text {
    margin: 10px;
  }
  .reg-input {
    margin: 10px;
    float: left;
    width: 100px;
  }
  .confirm-btn {
    float: left;
    width: 100px;
    position: relative;
    height: 100px;
    span {
      position: absolute;
      bottom: 20px;
    }
  }
}
</style>
