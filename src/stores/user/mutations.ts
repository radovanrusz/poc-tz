import { MutationTree } from 'vuex';
import { UserStore, UserData } from './user.types';
import { USER_DATA_INITIAL, USER_STATUS_OUT, USER_STATUS_IN } from './constants';

const mutations: MutationTree<UserStore> = {
  loginUser(state: UserStore, data: UserData) {
    const { id, name, email, role } = data;
    const newState = {
      userData: { id, name, email, role },
      userStatus: USER_STATUS_IN,
      accessToken: data.accessToken
    };
    Object.assign(state, newState);
  },
  logoutUser(state: UserStore) {
    const newState = {
      userData: USER_DATA_INITIAL,
      userStatus: USER_STATUS_OUT,
      accessToken: ''
    };
    Object.assign(state, newState);
  }
};

export default mutations;
