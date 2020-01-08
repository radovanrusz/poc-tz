import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '../types';
import { ModeStore, AppMode, Reference } from './mode.types';

const actions: ActionTree<ModeStore, RootState> = {
  setMode({ commit }: ActionContext<ModeStore, RootState>,
    { reference, status }: { reference: Reference, status: AppMode }) {
    commit('setMode', { reference, status });
  }
};

export default actions;
