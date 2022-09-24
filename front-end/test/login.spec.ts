import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/pages/login.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, min } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('min', min)

describe("login.vue test", () => {
  it("input Data", async () => {
    const wrapper = mount(App, { localVue })
    await wrapper.get('[data-test = "login_email"]').setValue("bar@test.com")
    await wrapper.get('[data-test = "login_password"]').setValue("testtest")
    expect(wrapper.vm.$data).toStrictEqual({
      email: "bar@test.com",
      password: "testtest",
      passwordInput: false,
      inputEmail: "",
    });
  });
  it("open password reset input", async () => {
    const wrapper = mount(App, { localVue })
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    expect(wrapper.vm.$data.passwordInput).toBe(true)
  });
  it("input reminder Data", async () => {
    const wrapper = mount(App, { localVue })
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    await wrapper.get('[data-test="pass_input"]').setValue("bar@test.com")
    expect(wrapper.vm.$data.inputEmail).toBe("bar@test.com")
  });
  it("send Data => exist", async () => {
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
    Object.defineProperty(window, "location", { value: {} })
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    await wrapper.get('[data-test="pass_input"]').setValue("bar@test.com")
    await wrapper.get('[data-test="send_email"]').trigger("click")
    expect(wrapper.vm.$axios.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/reminder', { "email": "bar@test.com" })
    expect(wrapper.vm.$router.push).toBeCalledWith("/exist")
  });
  it("send Data => notexist", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "User Not Found"
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
    Object.defineProperty(window, "location", { value: {} })
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    await wrapper.get('[data-test="pass_input"]').setValue("bar@test.com")
    await wrapper.get('[data-test="send_email"]').trigger("click")
    expect(wrapper.vm.$axios.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/reminder', { "email": "bar@test.com" })
    expect(wrapper.vm.$router.push).toBeCalledWith("/notexist")
  });
  it("email validate check 'registered email'", async () => {
    const wrapper = mount(App, { localVue })
    window.alert = jest.fn()
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    await wrapper.get('[data-test="send_email"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("登録したメールアドレスを入力して下さい")
  });
  it("email validate check 'valid email'", async () => {
    const wrapper = mount(App, { localVue })
    window.alert = jest.fn()
    await wrapper.get('[data-test="password_reset2"]').trigger("click")
    await wrapper.get('[data-test="pass_input"]').setValue("bartest.com")
    await wrapper.get('[data-test="send_email"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("有効なメールアドレスを入力して下さい")
  });
  it("login check", async () => {
    const wrapper = mount(App, { localVue })
    window.alert = jest.fn()
    await wrapper.get('[data-test="login"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("メールアドレスまたはパスワードが間違っております")
  });
});