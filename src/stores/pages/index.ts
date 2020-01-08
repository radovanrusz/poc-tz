import { Module } from 'vuex';
import { PagesStore } from './pages.types';
import { RootState } from '../types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { PAGES_INITIAL, PAGES_STATUS_INITIAL, PAGE_INITIAL } from './constants';

const namespaced = true;

const state: PagesStore = {
  allPages: PAGES_INITIAL,
  userPages: PAGES_INITIAL,
  pagesStatus: PAGES_STATUS_INITIAL,
  currentPage: PAGE_INITIAL
};

const pages: Module<PagesStore, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

export default pages;
