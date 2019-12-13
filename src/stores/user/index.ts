import { Module } from 'vuex';
import { UserStore } from './user.types';
import { RootState } from '../types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { USER_DATA_INITIAL, USER_STATUS_INITIAL } from './constants';

const namespaced = true;

const state: UserStore = {
  userData: USER_DATA_INITIAL,
  userStatus: USER_STATUS_INITIAL,
  accessToken: ''
};

const user: Module<UserStore, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

export default user;
