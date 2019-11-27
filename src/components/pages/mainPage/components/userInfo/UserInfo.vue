<template>
  <div class="card shadow p-3 mb-5 bg-white rounded" :id="idComponent">
    <div class="card-body">
      <h5 class="card-title">User Info</h5>
      <p class="card-text text-left">
        Name: {{ userName }}
        <br/>Email: {{ userEmail }}
        <br/>Role: {{ userRole }}
      </p>
      <a href="#" class="btn btn-primary" @click="userLogout">Logout</a>
      <hr class="mt-5 mb-3">
      <p class="mt-5 mb-0 text-center">
        <sup>*</sup>You are allowed to <br/>
        <span v-if="currentPageRead">
        <button type="button" class="btn btn-primary btn-sm border-dark btn-item">
            <i class="fa fa-eye" aria-hidden="true"></i>
        </button> view </span>
        <span v-if="currentPageWrite">
        <button type="button" class="btn btn-light btn-sm border-dark btn-item">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button> edit </span>items.
      </p>
    </div>
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
    logoutRef: {
      type: Function,
      required: true
    },
    userName: {
      required: true,
      type: String
    },
    userEmail: {
      required: true,
      type: String
    },
    userRole: {
      required: false,
      type: String
    },
    msg: {
      required: false,
      type: String
    }
  }
})
export default class UserInfo extends Vue {
  idComponent: string = 'userInfo';

  logoutRef!: any;

  msg!: string;

  userName!: string;

  userEmail!: string;

  userRole!: string;

  @PagesStore.Getter currentPage!: Page;

  userLogout() {
    this.logoutRef();
  }

  get currentPageRead(): Boolean {
    return generalHelper.pickDeep(this.currentPage, ['allowed', 'read'], false);
  }

  get currentPageWrite(): Boolean {
    return generalHelper.pickDeep(this.currentPage, ['allowed', 'write'], false);
  }
}
</script>

<style lang="scss" scoped>
</style>
