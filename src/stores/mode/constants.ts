import { AppMode } from './mode.types';

export const REFERENCE_INITIAL = {
  id: '',
  text: ''
};

export const MODE_INITIAL: AppMode = 'initial';
export const MODE_READ: AppMode = 'read';
export const MODE_EDIT: AppMode = 'edit';
export const MODE_INCOMPLETE: AppMode = 'incomplete';
export const MODE_LOADING: AppMode = 'loading';
export const MODE_LOADED: AppMode = 'loaded';
