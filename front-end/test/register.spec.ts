import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/pages/register.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, max, min } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('max', max)
extend('min', min)

describe("register.vue test", () => {
  it("Registration success", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $router: {
          push:jest.fn()
        },
      }
    })
    Object.defineProperty(window, "location", { value: {} });
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/sendemail")
  });
  it("Registration fail name", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: "ユーザー名は必須項目です",
                  email: undefined,
                  password: undefined,
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test = "name"]').setValue("foo")
    await wrapper.get('[data-test = "email"]').setValue("bar@test.com")
    await wrapper.get('[data-test = "password"]').setValue("testtest")
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("ユーザー名は必須項目です")
  });
  it("Registration fail email", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  name: undefined,
                  email: "メールアドレスは必須項目です",
                  password: undefined,
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test = "name"]').setValue("foo")
    await wrapper.get('[data-test = "email"]').setValue("bar@test.com")
    await wrapper.get('[data-test = "password"]').setValue("testtest")
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("メールアドレスは必須項目です")
  });
  it("Registration fail password", async () => {
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
                  password: "パスワードは必須項目です",
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test = "name"]').setValue("foo")
    await wrapper.get('[data-test = "email"]').setValue("bar@test.com")
    await wrapper.get('[data-test = "password"]').setValue("testtest")
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("パスワードは必須項目です")
  });
  it("Registration fail system error", async () => {
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
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        }
      }
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test = "name"]').setValue("foo")
    await wrapper.get('[data-test = "email"]').setValue("bar@test.com")
    await wrapper.get('[data-test = "password"]').setValue("testtest")
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});