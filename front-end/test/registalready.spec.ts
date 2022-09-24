import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "@/pages/registalready.vue";

describe("registalready.vue test", () => {
  it("Moving to login page", () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/login')
  });
  it("Opening 'password reset input'", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    await wrapper.get('[data-test="password_reset"]').trigger("click")
    expect(wrapper.vm.$data.passwordInput).toBe(true)
  });
  it("Sending reminder success", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
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
        }
      }
    })
    Object.defineProperty(window, "location", { value: {} })
    await wrapper.get('[data-test="password_reset"]').trigger("click")
    await wrapper.get('[data-test="pass_input"]').setValue("bar@test.com")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(window.location.href).toBe("http://localhost:8000/exist")
  });
  it("Sending reminder fail", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="password_reset"]').trigger("click")
    await wrapper.get('[data-test="send"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("登録したメールアドレスを入力して下さい")
  });
});