import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "@/pages/notexist.vue";

describe("notexist.vue test", () => {
  it("Moving to register & home page", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.at(0).props().to).toBe('/register')
    expect(links.at(1).props().to).toBe('/')
  });
});