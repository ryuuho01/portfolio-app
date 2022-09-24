import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "@/components/CommonHeader.vue";

describe("CommonHeader.vue test", () => {
  it("Moving links of guest check", () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: false,
          user: {
            authority:3
          }
        }
      }
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).props().to).toBe('/')
    expect(links.at(1).props().to).toBe('/register')
    expect(links.at(2).props().to).toBe('/login')
    expect(links.at(3).props().to).toBe('/')
    expect(links.at(4).props().to).toBe('/login')
    expect(links.at(5).props().to).toBe('/register')
  });
  it("Moving links of author check", () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            name: "test",
            authority:2
          }
        }
      }
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).props().to).toBe('/')
    expect(links.at(1).props().to).toBe('/mypage')
    expect(links.at(2).props().to).toBe('')
    expect(links.at(3).props().to).toBe('/')
    expect(links.at(4).props().to).toBe('/mypage')
  });
  it("Moving links of shopmanager check", () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            name: "test",
            authority: 1
          }
        }
      }
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).props().to).toBe('/')
    expect(links.at(1).props().to).toBe('/manage')
    expect(links.at(2).props().to).toBe('')
    expect(links.at(3).props().to).toBe('/')
    expect(links.at(4).props().to).toBe('/manage')
  });
  it("Moving links of manager check", () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            name: "test",
            authority: 0
          }
        }
      }
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).props().to).toBe('/')
    expect(links.at(1).props().to).toBe('/manage')
    expect(links.at(2).props().to).toBe('')
    expect(links.at(3).props().to).toBe('/')
    expect(links.at(4).props().to).toBe('/manage')
  });
  it("Logout check", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: true,
          user: {
            name: "test",
            authority: 2
          },
          logout: jest.fn(() => Promise.reject())
        },
      }
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="logout"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("ログアウトに失敗しました")
  });
  it("Menu open check", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $auth: {
          loggedIn: false,
          user: {
            authority: 3
          },
        },
      }
    })
    const elm = document.createElement('div')
    elm.id = 'menu'
    elm.className = 'menu-button'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="open"]').trigger("click")
    expect(elm.className).toBe( "menu-button open in")
  });
});