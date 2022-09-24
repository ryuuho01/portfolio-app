import { mount } from "@vue/test-utils";
import App from "@/components/JobTest.vue";

describe("JobTest.vue test", () => {
  it("Data set & trigger 'change_value alert-check' 'テストモードを解除しました'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    } )
    await wrapper.setData({
      test: "0",
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="change_value"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("テストモードを解除しました")
  });
  it("Data set & trigger 'change_value alert-check' 'テストモードになりました'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    } )
    await wrapper.setData({
      test: "1",
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="change_value"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("テストモードになりました")
  });
  it("Data set & trigger 'change_value alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            data: {
              data: [{
                message: "NG",
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    } )
    await wrapper.setData({
      test: "1",
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="change_value"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});