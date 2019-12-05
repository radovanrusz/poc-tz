<template>
  <div :id="idComponent" class="subcategory">
    <p class="title">{{title}}</p>
    <p class="text">{{text}}</p>
    <div class="form-group reg-input">
      <label for="kmat">KMAT</label>
      <input type="text" class="form-control" id="kmat" v-model="regKmat">
    </div>
    <div class="form-group reg-input">
      <label for="mvm">MVM</label>
      <input type="text" class="form-control" id="mvm" v-model="regMvm">
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
    <p class="confirm-btn">
      <span><button type="button" class="btn btn-primary" @click="putExistingId">Update</button></span>
    </p>
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
const material1 = process.env.VUE_APP_MATERIAL_URL1;

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

  putNewId() {
    debugger;
    const dataObj = {
      hmotnost: 660997777,
      kmat: '12',
      mnozstvi: 11,
      mvmFrom: '14',
      mvmTo: '16'
    };
    httpService.putDirect(material, dataObj).then((response) => {
      debugger;
    });
  }

  putExistingId() {
    const idParam = 'kmat=11111';
    const dataObj = { hmotnost: 6609889900 };
    httpService.putDirect(`${material}?${idParam}`, dataObj).then((response) => {
      debugger;
    });
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
