import { mount } from "@vue/test-utils";
import App from "@/components/SendingEmail.vue";

describe("SendingEmail.vue test", () => {
  it("Modal open&close trigger 'modal", async () => {
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
      emailData: [{
          name: "test1",
          email: "test1@test.com",
        },
        {
          name: "test2",
          email: "test2@test.com",
        }
      ],
      keyword: "",
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="close1"]').trigger("click")
    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="close2"]').trigger("click")
  });
  it("Modal All trigger until sendEmail(true) alert-check' 'メールを送信しました' when keyword = ''", async () => {
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      emailData: [{
          name: "test1",
          email: "test1@test.com",
        },
        {
          name: "test2",
          email: "test2@test.com",
        }
      ],
      keyword: "",
      TO: [],
      CC: [],
      BCC: [],
      subject:"",
      text: "",
    })
    window.alert = jest.fn()
    const elm1 = document.createElement('input')
    elm1.value = 'test1@test.com'
    const elm2 = document.createElement('input')
    elm2.value = 'test2@test.com'
    document.querySelectorAll = jest.fn().mockReturnValue(
      [
        elm1,
        elm2,
      ]
    )
    const elm3 = document.createElement('input')
    elm3.id = 'email1'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm1)


    await wrapper.get('[data-test="modal"]').trigger("click")
    // To-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    await wrapper.get('[data-test="clearTo"]').trigger("click")
    // To-add
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    // CC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addCC"]').trigger("click")
    await wrapper.get('[data-test="clearCC"]').trigger("click")
    // BCC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addBCC"]').trigger("click")
    await wrapper.get('[data-test="clearBCC"]').trigger("click")
    // sendEmail-trigger
    await wrapper.get('[data-test="sendEmail"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("メールを送信しました")
  });
  it("Modal All trigger until sendEmail(true) alert-check' 'メールを送信しました' when keyword = 'test'", async () => {
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      emailData: [{
          name: "test1",
          email: "test1@test.com",
        },
        {
          name: "test2",
          email: "test2@test.com",
        }
      ],
      keyword: "test",
      TO: [],
      CC: [],
      BCC: [],
      subject:"",
      text: "",
    })
    window.alert = jest.fn()
    const elm1 = document.createElement('input')
    elm1.value = 'test1@test.com'
    const elm2 = document.createElement('input')
    elm2.value = 'test2@test.com'
    document.querySelectorAll = jest.fn().mockReturnValue(
      [
        elm1,
        elm2,
      ]
    )
    const elm3 = document.createElement('input')
    elm3.id = 'email1'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm1)


    await wrapper.get('[data-test="modal"]').trigger("click")
    // To-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    await wrapper.get('[data-test="clearTo"]').trigger("click")
    // To-add
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    // CC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addCC"]').trigger("click")
    await wrapper.get('[data-test="clearCC"]').trigger("click")
    // BCC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addBCC"]').trigger("click")
    await wrapper.get('[data-test="clearBCC"]').trigger("click")
    // sendEmail-trigger
    await wrapper.get('[data-test="sendEmail"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("メールを送信しました")
  });
  it("Modal All trigger until sendEmail(false) alert-check' 'sending false'", async () => {
    const wrapper = mount( App, {
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  TO: "sending false"
                }
              }
            }
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
      emailData: [{
          name: "test1",
          email: "test1@test.com",
        },
        {
          name: "test2",
          email: "test2@test.com",
        }
      ],
      keyword: "",
      TO: [],
      CC: [],
      BCC: [],
      subject:"",
      text: "",
    })
    window.alert = jest.fn()
    const elm1 = document.createElement('input')
    elm1.value = 'test1@test.com'
    const elm2 = document.createElement('input')
    elm2.value = 'test2@test.com'
    document.querySelectorAll = jest.fn().mockReturnValue(
      [
        elm1,
        elm2,
      ]
    )
    const elm3 = document.createElement('input')
    elm3.id = 'email1'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm1)


    await wrapper.get('[data-test="modal"]').trigger("click")
    // To-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    await wrapper.get('[data-test="clearTo"]').trigger("click")
    // To-add
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    // CC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addCC"]').trigger("click")
    await wrapper.get('[data-test="clearCC"]').trigger("click")
    // BCC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addBCC"]').trigger("click")
    await wrapper.get('[data-test="clearBCC"]').trigger("click")
    // sendEmail-trigger
    await wrapper.get('[data-test="sendEmail"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("sending false")
  });
  it("Modal All trigger until sendEmail(false) alert-check' 'TO:の宛先を選択して下さい' when keyword = ''", async () => {
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
        $auth: {
          user: {
            id:999,
          }
        }
      },
    } )
    await wrapper.setData({
      emailData: [{
          name: "test1",
          email: "test1@test.com",
        },
        {
          name: "test2",
          email: "test2@test.com",
        }
      ],
      keyword: "",
      TO: [],
      CC: [],
      BCC: [],
      subject:"",
      text: "",
    })
    window.alert = jest.fn()
    const elm1 = document.createElement('input')
    elm1.value = 'test1@test.com'
    const elm2 = document.createElement('input')
    elm2.value = 'test2@test.com'
    document.querySelectorAll = jest.fn().mockReturnValue(true)
    const elm3 = document.createElement('input')
    elm3.id = 'email1'
    jest.spyOn(document, 'getElementById').mockReturnValue(elm1)


    await wrapper.get('[data-test="modal"]').trigger("click")
    // To-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    await wrapper.get('[data-test="clearTo"]').trigger("click")
    // To-add
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addTo"]').trigger("click")
    // CC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addCC"]').trigger("click")
    await wrapper.get('[data-test="clearCC"]').trigger("click")
    // BCC-check
    await wrapper.get('[data-test="selectAll"]').trigger("click")
    await wrapper.get('[data-test="addBCC"]').trigger("click")
    await wrapper.get('[data-test="clearBCC"]').trigger("click")
    // sendEmail-trigger
    await wrapper.get('[data-test="sendEmail"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("TO:の宛先を選択して下さい")
  });
});