<template>
<div class="login-form">
  <div class="card shadow p-3 mb-5 bg-white rounded">
    <div class="card-body">
      <h4 class="card-title text-center">Login page</h4>
      <form @submit.prevent="loginFormM">
        <div class="form-group">
          <label for="userName">User name</label>
          <input type="text"
            v-model="userNameVal"
            ref="userName" class="form-control" id="userName"
            aria-describedby="userNameHelp" placeholder="Type user name">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password"
            v-model="passwordVal"
            class="form-control" id="exampleInputPassword1" placeholder="Type password">
        </div>
        <button type="submit" class="btn btn-primary"
          @keydown.tab.prevent="setFocus">Login
        </button>
      </form>
      <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if='showAlert'>
        Please use valid credentials.<br/>In case issue still persists, please contact your administrator.
        <button type="button" class="close" ref="alertBtn" aria-label="Close"
          @click.prevent="hideAlertBanner"
          @keydown.tab.prevent="setFocusInput">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  props: {
    loginRef: {
      required: true,
      type: Function
    }
  }
})
export default class LoginForm extends Vue {
  loginRef!: any;

  userNameVal: string = '';

  passwordVal: string = '';

  showAlert: boolean = false;

  loginFormM() {
    this.loginRef({ name: this.userNameVal, password: this.passwordVal });
    // this.userNameValGS = `name ${this.userNameValGS}` ;
  }

  showAlertBannerAndReset() {
    this.showAlert = true;
    this.userNameVal = '';
    this.passwordVal = '';
  }

  hideAlertBanner() {
    this.showAlert = false;
    (this.$refs.userName as HTMLFormElement).focus();
  }

  setFocus() {
    if (!this.showAlert) {
      (this.$refs.userName as HTMLFormElement).focus();
    } else if (this.showAlert && this.$refs.alertBtn) {
      (this.$refs.alertBtn as HTMLFormElement).focus();
    }
  }

  setFocusInput() {
    (this.$refs.userName as HTMLFormElement).focus();
  }

  get userNameValGS(): string {
    return this.userNameVal;
  }

  set userNameValGS(val: string) {
    this.userNameVal = val;
  }
}
</script>

<style lang="scss" scoped>
.login-form {
    text-align: left;
    form {
      margin: 20px 0;
    }
}
</style>
