import { MutationTree } from 'vuex';
import { PagesStore, Page } from './pages.types';
import {
  PAGES_INITIAL, PAGES_STATUS_LOADED, PAGES_STATUS_INITIAL, PAGE_INITIAL
} from './constants';

const mutations: MutationTree<PagesStore> = {
  storePagesData(state: PagesStore, { allPages = [], userPages = [], currentPage = {} } : { allPages: Page[], userPages: any, currentPage: any }) {
    debugger;
    const newState = {
      allPages,
      userPages,
      currentPage,
      pagesStatus: PAGES_STATUS_LOADED
    };
    Object.assign(state, newState);
  },
  destroyUserPagesData(state: PagesStore, data: Page[] = PAGES_INITIAL) {
    debugger;
    // const allPages = state.pagesStatus;
    // state.allPages = data;
    state.userPages = data;
    state.currentPage = PAGE_INITIAL;
    state.pagesStatus = PAGES_STATUS_INITIAL;
  }
};

export default mutations;
