import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/pages/input_password.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, min } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('min', min)

describe("input_password.vue test", () => {
  it("Password check", async () => {
    const wrapper = mount(App, { localVue })
    window.alert = jest.fn()
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="confirmPassword"]').setValue("test")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("パスワードが一致しません")
  });
  it("Registration success", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Success"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $route: {
          query: {
            id: "foobar"
          }
        },
        $router: {
          push:jest.fn()
        },
      }
    })
    Object.defineProperty(window, "location", { value: {} });
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="confirmPassword"]').setValue("testtest")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/successchange")
  });
  it("Registration success but not found", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Notfound User"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $route: {
          query: {
            id: "foobar"
          }
        },
        $router: {
          push:jest.fn()
        },
      }
    })
    Object.defineProperty(window, "location", { value: {} });
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="confirmPassword"]').setValue("testtest")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/registerror")
  });
  it("Registration fail", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  password: "Notfound User"
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $route: {
          query: {
            id: "foobar"
          }
        }
      }
    })
    Object.defineProperty(window, "location", { value: {} });
    window.alert = jest.fn()
    await wrapper.get('[data-test="password"]').setValue("testtest")
    await wrapper.get('[data-test="confirmPassword"]').setValue("testtest")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("Notfound User")
  });
});