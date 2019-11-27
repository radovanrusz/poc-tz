import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import user from './user';
import mode from './mode';
import pages from './pages';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    user,
    mode,
    pages
  }
};

export default new Vuex.Store<RootState>(store);
