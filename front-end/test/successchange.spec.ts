import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "@/pages/successchange.vue";

describe("successchange.vue test", () => {
  it("Moving to login page", async () => {
    const wrapper = mount(App, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/login')
  });
});