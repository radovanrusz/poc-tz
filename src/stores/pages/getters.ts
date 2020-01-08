import { GetterTree } from 'vuex';
import {
  PagesStore,
  Page,
  PagesStatus,
  Subpage
} from './pages.types';
import { RootState } from '../types';

const getters: GetterTree<PagesStore, RootState> = {
  pages(state: PagesStore): Page[] {
    return state.userPages;
  },
  pagesStatus(state: PagesStore): PagesStatus | string {
    return state.pagesStatus;
  },
  currentPage(state: PagesStore): Page {
    return state.currentPage;
  },
  currentPageSubpage(state: PagesStore): Subpage {
    return state.currentPage.currentSubpage;
  }
};

export default getters;
