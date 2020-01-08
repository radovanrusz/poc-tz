import { Page, PagesStatus } from './pages.types';

export const PAGES_STATUS_INITIAL: PagesStatus = 'initial';
export const PAGES_STATUS_LOADING: PagesStatus = 'loading';
export const PAGES_STATUS_LOADED: PagesStatus = 'loaded';

export const PAGES_INITIAL: Page[] = [];

export const PAGE_INITIAL: Page = {
  id: '',
  name: '',
  allowed: {},
  subpages: [],
  currentSubpage: {}
};
