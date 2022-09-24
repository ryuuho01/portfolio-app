import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "@/pages/exist.vue";

describe("exist.vue test", () => {
  it("Moving to home page", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/')
  });
});