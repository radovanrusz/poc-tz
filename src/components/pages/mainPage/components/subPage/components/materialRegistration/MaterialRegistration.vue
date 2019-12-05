<template>
  <div :id="idComponent" class="subcategory">
    <p class="title">{{title}}</p>
    <p class="text">{{text}}</p>
    <p>
      <button type="button" class="btn btn-primary" @click="putNewId">Put new id test</button>
    </p>
    <input/>
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

  putNewId() {
    debugger;
    const idParam = 'kmat=11111';
    const dataObj = { hmotnost: 6609 };
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
