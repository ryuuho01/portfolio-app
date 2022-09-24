import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/components/ReservationWindow.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
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

describe("ReservationWindow.vue test", () => {
  it("Navigation guard", async () => {
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
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  });
  it("trigger 'reservation alert-check' '重複して予約はできません'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 999,
                shop_id: 99,
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("重複して予約はできません")
  });
  it("trigger 'reservation alert-check' '日付を選択して下さい'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("日付を選択して下さい")
  });
  it("trigger 'reservation alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              message: "Not found"
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
  it("trigger 'reservation' confirm reject", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              message: "Not found"
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(false)
    await wrapper.get('[data-test="reserve"]').trigger("click")
  });
  it("trigger 'reservation 'success'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 33,
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              message: "OK"
            },
          })),
          put: jest.fn(() => Promise.resolve({
            data: {
              message: "OK"
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
  });
  it("trigger 'reservation alert-check(fail)' 'reservation_date'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 33,
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: "reservation_date",
                  reservation_time: "reservation_time",
                  num_members:"num_members",
                }
              }
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("reservation_date")
  });
  it("trigger 'reservation alert-check(fail)' 'reservation_time'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 33,
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: "reservation_time",
                  num_members:"num_members",
                }
              }
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("reservation_time")
  });
  it("trigger 'reservation alert-check(fail)' 'num_members'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 33,
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: undefined,
                  num_members:"num_members",
                }
              }
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("num_members")
  });
  it("trigger 'reservation alert-check(fail)' 'システムエラーが発生しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 33,
                user_id: 99,
                shop_id: 9,
              }],
            },
          })),
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: undefined,
                  num_members: undefined,
                }
              }
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id:999
          }
        },
        $route: {
          params: {
            id: 99
          }
        },
        $router: {
          push:jest.fn()
        }
      }
    })
    await wrapper.setData({
      shopCurrent: {
        reservationDate: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        description: "testtesttest",
      },
      userId: 999,
      shopId: 99,
      reservationDate: "2000-00-00",
      reservationTime: "00:00",
      numMembers: "20",
    })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.value = '2000-00-00'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    window.confirm = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="reserve"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});