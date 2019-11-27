import { MutationTree } from 'vuex';
import { ModeStore, AppMode, Reference } from './mode.types';

const mutations: MutationTree<ModeStore> = {
  setMode(state: ModeStore, { reference, status }: { reference: Reference, status: AppMode }) {
    const newState: ModeStore = {
      reference,
      status
    };
    Object.assign(state, newState);
  }
};

export default mutations;
