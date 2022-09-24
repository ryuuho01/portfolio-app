import { mount } from "@vue/test-utils";
import App from "@/pages/done.vue";

describe("done.vue test", () => {
  it("Click check", async () => {
    const wrapper = mount(App)
    await wrapper.get('[data-test="back"]').trigger("click")
  });
});