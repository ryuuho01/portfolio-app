import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/components/AddingManager.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, min, max } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('min', min)
extend('max', max)

describe("AddingManager.vue test", () => {
  it("Data set & trigger 'addManager alert-check' '店舗代表者を登録しました。作成したメールアドレス宛に、ログイン情報を自動転送しました。'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="name"]').setValue("test")
    await wrapper.get('[data-test="email"]').setValue("test@test.com")
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="addManager"]').trigger("click")
  });
  it("Data set & trigger 'addManager alert-check' 'test'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: 'test',
                  email: 'test@test.com',
                  password: 'testtest',
                }
              }
            }
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="name"]').setValue("test")
    await wrapper.get('[data-test="email"]').setValue("test@test.com")
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="addManager"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("test")
  });
  it("Data set & trigger 'addManager alert-check' 'test@test.com'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: undefined,
                  email: 'test@test.com',
                  password: 'testtest',
                }
              }
            }
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="name"]').setValue("test")
    await wrapper.get('[data-test="email"]').setValue("test@test.com")
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="addManager"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("test@test.com")
  });
  it("Data set & trigger 'addManager alert-check' 'testtest'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: undefined,
                  email: undefined,
                  password: 'testtest',
                }
              }
            }
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="name"]').setValue("test")
    await wrapper.get('[data-test="email"]').setValue("test@test.com")
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="addManager"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("testtest")
  });
  it("Data set & trigger 'addManager alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: undefined,
                  email: undefined,
                  password: undefined,
                }
              }
            }
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="name"]').setValue("test")
    await wrapper.get('[data-test="email"]').setValue("test@test.com")
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="addManager"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});