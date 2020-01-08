import { Module } from 'vuex';
import { ModeStore } from './mode.types';
import { RootState } from '../types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { MODE_INITIAL, REFERENCE_INITIAL } from './constants';

const namespaced = true;

const state: ModeStore = {
  reference: REFERENCE_INITIAL,
  status: MODE_INITIAL
};

const user: Module<ModeStore, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

export default user;
