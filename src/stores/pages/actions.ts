import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '../types';
import { PagesStore, Page } from './pages.types';
import { HttpMockService, HttpService } from '../../services/http.service';
import { GeneralHelper } from '../../helpers/general.helper';

const httpService = new HttpService();
const httpMockService = new HttpMockService();
const generalHelper = new GeneralHelper();
const DEFAULT_CURRENTPAGE_INDEX = 0;
const DEFAULT_CURRENTSUBPAGE_INDEX = 0;

const actions: ActionTree<PagesStore, RootState> = {
  storePagesData({ commit }: ActionContext<PagesStore, RootState>) {
    debugger;
    return new Promise((resolve, reject) => {
      // httpService.get('initialPages', { params: {} }).then((response) => {
      httpMockService.getMockDataInitialPagesDelay().then((response) => {
        /* eslint-disable */
        debugger;
        // const pagesBe: any = response.data; // server response
        const pagesBe: any = response; // mock server response
        commit('storePagesData', { allPages: pagesBe, undefined });
        resolve(true);
      }, (error) => {
        console.log('error ', error);
      });
    })
  },
  userPagesData({ commit, state }: ActionContext<PagesStore, RootState>, { role }: { role: string[] }) {
    debugger;


    // let roleUser = '';
    // if (typeof role === 'string') {
    //   roleUser = role;
    // } else if (Array.isArray(role)) {
    //   roleUser = role[0];
    // }
    // const allPages: Page[] = state.allPages;
    // let userPages: any[] = [];
    // let currentPage: any = {};
    // let currentSubpage: any = {};
    // for (let i = 0; i < allPages.length; i++) {
    //   if (allPages[i] && allPages[i].allowed) {
    //     debugger;
    //     const current: any = generalHelper.processRole(roleUser, allPages[i]);
    //     if (current && current.allowed && (current.allowed.read || current.allowed.write)) {
    //       userPages.push(current);
    //     }
    //   }
    // }
    // debugger;
    // if (userPages && userPages.length > 0) {
    //   // userPages.sort((a, b) => (a.id < b.id ? -1 : 1));
    //   currentPage = userPages[DEFAULT_CURRENTPAGE_INDEX];
    //   if (currentPage && currentPage.subpages && currentPage.subpages.length > 0) {
    //     currentPage.currentSubpage = currentPage.subpages[DEFAULT_CURRENTSUBPAGE_INDEX];
    //   }
    // }
    // debugger;
    // commit('storePagesData', { allPages, userPages, currentPage });



    return new Promise((resolve, reject) => {
      debugger;
      httpMockService.getMockDataAllowedRolesDelay().then((response: any) => {
      // let response = httpMockService.getMockDataAllowedRoles();
        debugger;
        const res: any = response.allowed_content; // server response
        const allPages: Page[] = state.allPages;
        let userPages: any[] = [];
        let currentPage: any = {};
        // let currentSubpage: any = {};
        for (let i = 0; i < allPages.length; i++) {
          let current1: any = allPages[i];
          const current: any = generalHelper.processAllowedContent(allPages[i], res);
          if (current) {
            userPages.push(current);
          }
        }
        if (userPages && userPages.length > 0) {
        // userPages.sort((a, b) => (a.id < b.id ? -1 : 1));
          currentPage = userPages[DEFAULT_CURRENTPAGE_INDEX];
          if (currentPage && currentPage.subpages && currentPage.subpages.length > 0) {
            currentPage.currentSubpage = currentPage.subpages[DEFAULT_CURRENTSUBPAGE_INDEX];
            currentPage.allowed = { read: true, write: true };
          }
        }
        debugger;
        commit('storePagesData', { allPages, userPages, currentPage });
        resolve(res);
      }, (error: any) => {
        console.log('error ', error);
      });
    });
  },
  destroyUserPagesData({ commit }: ActionContext<PagesStore, RootState>) {
    debugger;
    const data: Page[] = [];
    commit('destroyUserPagesData', data);
  },
  setCurrentPage({ commit, state }: ActionContext<PagesStore, RootState>, id: string) {
    let { allPages, userPages, currentPage }: PagesStore = state;
    currentPage = generalHelper.getCurrentPageBasedId(userPages, id);
    currentPage.currentSubpage = currentPage.subpages[DEFAULT_CURRENTSUBPAGE_INDEX];
    commit('storePagesData', { allPages, userPages, currentPage });
  },
  setCurrentPageSubpage({ commit, state }: ActionContext<PagesStore, RootState>, id: string) {
    debugger;
    let { allPages, userPages, currentPage }: PagesStore = state;
    currentPage.currentSubpage = generalHelper.getCurrentSubpageBasedId(currentPage.subpages, id);
    commit('storePagesData', { allPages, userPages, currentPage });
  }
};

export default actions;
