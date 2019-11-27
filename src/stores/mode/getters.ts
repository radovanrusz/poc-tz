import { GetterTree } from 'vuex';
import { ModeStore, Reference, AppMode } from './mode.types';
import { RootState } from '../types';

const getters: GetterTree<ModeStore, RootState> = {
  modeReference(state: ModeStore): Reference {
    return state.reference;
  },
  modeStatus(state: ModeStore): AppMode | string {
    return state.status;
  }
};

export default getters;
