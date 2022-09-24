import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import AddingManager from '@/pages/done.vue';
import JobTest from '@/pages/done.vue';
import ShopCreate from '@/pages/done.vue';
import EdittingShop from '@/pages/done.vue';
import SendingEmail from '@/pages/done.vue';
import App from "@/pages/manage.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('AddingManager', AddingManager)
localVue.component('JobTest', JobTest)
localVue.component('ShopCreate', ShopCreate)
localVue.component('EdittingShop', EdittingShop)
localVue.component('SendingEmail', SendingEmail)
const { required, max } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('max', max)
const customRule = {
  params: ['string'],
  message: '必須項目です',
  validate(value:any, {string}:any) {
    return value !== string;
  }
};
extend('custom_rule', customRule);

describe("manage.vue test", () => {
  it("Display check 'authority = 0'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            authority: 0
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    })
  });
  it("Display check 'authority = 1'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: false,
          user: {
            id: 999,
            authority: 1
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    })
  });
  it("Delete trigger check 'confirm true'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
                shop_id: 999,
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: false,
          user: {
            shop_id: 999,
            id: 999,
            authority: 1
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: [{
        id: 999,
        reservations: [{
          user_id: 999
        }],
      }],
      reservationsCurrent: [{
        id: 999,
        reservations: [{
          user_name: "test",
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      display: true,
    })
    Object.defineProperty(window, "location", { value: {} })
    window.confirm = jest.fn().mockReturnValue(true)
    window.alert = jest.fn()
    await wrapper.get('[data-test="delete"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("予約を取り消しました")
  });
  it("Delete trigger check 'confirm false'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
                shop_id: 999,
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: false,
          user: {
            shop_id: 999,
            id: 999,
            authority: 1
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: [{
        id: 999,
        reservations: [{
          user_id: 999
        }],
      }],
      reservationsCurrent: [{
        id: 999,
        reservations: [{
          user_name: "test",
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      display: true,
    })
    Object.defineProperty(window, "location", { value: {} })
    window.confirm = jest.fn().mockReturnValue(false)
    window.alert = jest.fn()
    await wrapper.get('[data-test="delete"]').trigger("click")
    // expect(window.alert).toHaveBeenCalledWith("予約を取り消しました")
  });
});