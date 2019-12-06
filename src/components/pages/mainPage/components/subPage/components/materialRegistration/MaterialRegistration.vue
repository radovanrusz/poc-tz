<template>
  <div :id="idComponent" class="subcategory">
    <p class="title">{{title}}</p>
    <p class="text">{{text}}</p>
    <div class="form-group reg-input" v-bind:class="{error: !regKmat.valid}">
      <label for="kmat">KMAT</label>
      <input type="text" class="form-control" id="kmat" v-model="regKmat.value">
      <span v-if="!regKmat.valid">Required!</span>
    </div>
    <div class="form-group reg-input" v-bind:class="{error: !regMvmValid}">
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
      <span v-if="!regMvmValid">Required!</span>
    </div>
    <div class="form-group reg-input" v-bind:class="{error: !regMnozstvi.valid}">
      <label for="mnozstvi">MNOZSTVI</label>
      <input type="text" class="form-control" id="mnozstvi" v-model="regMnozstvi.value">
      <span v-if="!regMnozstvi.valid">Required whole number!</span>
    </div>
    <div class="form-group reg-input" v-bind:class="{error: !regHmotnost.valid}">
      <label for="hmotnost">HMOTNOST</label>
      <input type="text" class="form-control" id="hmotnost" v-model="regHmotnost.value">
      <span v-if="!regHmotnost.valid">Required whole number!</span>
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

  regKmat: { value: any, valid: boolean } = { value: null, valid: true };

  regMvm: any = null;

  regMvmValid: boolean = true;

  regMnozstvi: { value: any, valid: boolean } = { value: null, valid: true };

  regHmotnost: { value: any, valid: boolean } = { value: null, valid: true };

  optionsMvm: any = [];

  @ModeStore.Action setMode!:
    ({ reference, status }: { reference: Reference, status: AppMode }) => void;

  created() {
    this.loadMaterialMvmItems();
  }

  checkInputs() {
    debugger;
    let res = 0;
    if (this.regKmat && this.regKmat.value) {
      res++;
      this.regKmat.valid = true;
    } else {
      this.regKmat.valid = false;
    }
    if (this.regMvm && this.regMvm.title) {
      res++;
      this.regMvmValid = true;
    } else {
      this.regMvmValid = false;
    }
    if (this.regMnozstvi && this.regMnozstvi.value && !Number.isInteger(this.regMnozstvi.value)) {
      res++;
      this.regMnozstvi.valid = true;
    } else {
      this.regMnozstvi.valid = false;
    }
    if (this.regHmotnost && this.regHmotnost.value && !Number.isInteger(this.regHmotnost.value)) {
      res++;
      this.regHmotnost.valid = true;
    } else {
      this.regHmotnost.valid = false;
    }
    return res === 4;
  }

  putNewId() {
    debugger;
    if (this.checkInputs()) {
      const dataObj = {
        hmotnost: Number(this.regHmotnost.value),
        kmat: this.regKmat.value,
        mnozstvi: Number(this.regMnozstvi.value),
        mvm: this.regMvm.title
      };
      httpService.putDirect(material, dataObj).then((response) => {
        debugger;
      });
    }
  }

  // putExistingId() {
  //   const idParam = 'id=2';
  //   const dataObj = { hmotnost: 120, mnozstvi: 11 };
  //   httpService.putDirect(`${material}?${idParam}`, dataObj).then((response) => {
  //     debugger;
  //   });
  // }

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
      debugger;
      [this.regMvm] = this.optionsMvm;
    });
  }

  onChangeMultiselect(event: any, id: any) {
    debugger;
    if (id === 'mvm1') {
      this.regMvm = event;
      debugger;
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
  .error {
    input {
      border:1px solid red;
    }
    span {
      color: red;
    }
  }
  ::v-deep .multiselect {
      .multiselect__tags {
        border-color: #ced4da;
        min-height: 38px;
      }
  }
  .error::v-deep .multiselect {
      .multiselect__tags {
        border:1px solid red;
      }
  }
}
</style>
