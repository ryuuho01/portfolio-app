import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import ReservationWindow from '@/components/ReservationWindow.vue';
import CommentWindow from '@/components/CommentWindow.vue';
import App from "@/pages/detail/_id.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ReservationWindow', ReservationWindow)
localVue.component('CommentWindow', CommentWindow)
const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)
const customRule = {
  params: ['string'],
  message: '必須項目です',
  validate(value:any, {string}:any) {
    return value !== string;
  }
};
extend('custom_rule', customRule);

describe("detail.vue test", () => {
  it("Back button", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: false,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id:999
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      }
    })
    await wrapper.get('[data-test="back"]').trigger("click")
  });
  
});