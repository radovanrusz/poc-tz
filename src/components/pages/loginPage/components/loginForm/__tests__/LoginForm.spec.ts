import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import LoginForm from '@/components/pages/loginPage/components/loginForm/LoginForm.vue';

// const Constructor = Vue.extend(LoginForm);
// const vm = new Constructor().$mount();

const props = {
  loginRef() { }
};

const getWrapperShallow = (propsData = props): Wrapper<LoginForm> => shallowMount(LoginForm, {
  propsData: {
    ...propsData
  }
});

const getWrapperMount = (propsData = props): Wrapper<LoginForm> => mount(LoginForm, {
  propsData: {
    ...propsData
  }
});

let wrapper: Wrapper<LoginForm>;

describe('LoginForm.vue', () => {
  beforeEach(() => {
    wrapper = getWrapperShallow();
  });
  it('should match the snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
  it('renders input id userName and id exampleInputPassword1', () => {
    const inputFieldUserName = wrapper.find('input#userName');
    const inputFieldPassword = wrapper.find('input#exampleInputPassword1');
    expect(inputFieldUserName.exists()).toBe(true);
    expect(inputFieldUserName.isVisible()).toBe(true);
    expect(inputFieldPassword.exists()).toBe(true);
    expect(inputFieldPassword.isVisible()).toBe(true);
  });
  it('calls method loginFormM after form submit done', () => {
    const wrapper: any = getWrapperShallow();
    const spyLoginFormM = jest.spyOn(wrapper.vm, 'loginFormM');
    wrapper.setMethods({ loginFormM: spyLoginFormM });
    expect(wrapper.vm.lf).toBe('');
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.loginFormM).toHaveBeenCalled();
    expect(wrapper.vm.lf).toBe('ok');
  });
  it('calls method loginFormM after form submit button clicked', () => {
    const wrapper: any = shallowMount(LoginForm, {
      propsData: {
        loginRef() { }
      },
      attachToDocument: true
    });

    // create a spy on the instance method
    const spyLoginFormM = jest.spyOn(wrapper.vm, 'loginFormM');
    // replace the instance method with the spy
    wrapper.setMethods({ loginFormM: spyLoginFormM });

    expect(wrapper.vm.lf).toBe('');
    wrapper.find('form button[type="submit"]').trigger('click');
    expect(wrapper.vm.lf).toBe('ok');
    expect(wrapper.vm.loginFormM).toHaveBeenCalled();

    // remove the spy
    spyLoginFormM.mockReset();
  });
});
