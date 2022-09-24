import { mount } from "@vue/test-utils";
import App from "@/components/Feedback.vue";

describe("Feedback.vue test", () => {
  it("Data set & trigger 'evaluation(item.id) 「評価しない」alert-check' 'ご回答、ありがとうございました！'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 999,
                shop_name: "shoptest",
                evaluation: 5,
                answer: 0
              }],
            },
          })),
          put: jest.fn(() => Promise.resolve({
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      user_feedback: [{
        user_id: 999,
        shop_name: "shoptest",
        evaluation: 5,
        answer: 0
      }],
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    await wrapper.get('[data-test="evaluation1(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation2(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation3(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation4(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation5(item.id)"]').trigger("click")

    await wrapper.get('[data-test="notEvaluate(item.id)"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("ご回答、ありがとうございました！")
  });
  it("Data set & trigger 'evaluation(item.id) 「評価しない」alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 999,
                shop_name: "shoptest",
                evaluation: 5,
                answer: 0
              }],
            },
          })),
          put: jest.fn(() => Promise.reject({
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      user_feedback: [{
        user_id: 999,
        shop_name: "shoptest",
        evaluation: 5,
        answer: 0
      }],
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    await wrapper.get('[data-test="evaluation1(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation2(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation3(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation4(item.id)"]').trigger("click")
    await wrapper.get('[data-test="evaluation5(item.id)"]').trigger("click")

    await wrapper.get('[data-test="notEvaluate(item.id)"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
  it("Data set & trigger 'evaluation(item.id) 「評価する」alert-check' 'ご回答、ありがとうございました！'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 999,
                shop_name: "shoptest",
                evaluation: 5,
                answer: 0
              }],
            },
          })),
          put: jest.fn(() => Promise.resolve({
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      user_feedback: [{
        user_id: 999,
        shop_name: "shoptest",
        evaluation: 5,
        answer: 0
      }],
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()

    await wrapper.get('[data-test="evaluate(item.id)"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("ご回答、ありがとうございました！")
  });
  it("Data set & trigger 'evaluation(item.id) 「評価する」alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                user_id: 999,
                shop_name: "shoptest",
                evaluation: 5,
                answer: 0
              }],
            },
          })),
          put: jest.fn(() => Promise.reject({
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      user_feedback: [{
        user_id: 999,
        shop_name: "shoptest",
        evaluation: 5,
        answer: 0
      }],
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()

    await wrapper.get('[data-test="evaluate(item.id)"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});