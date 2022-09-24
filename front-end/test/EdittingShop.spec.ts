import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/components/EdittingShop.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, max } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('max', max)

describe("EdittingShop.vue test", () => {
  it("trigger 'get_allInfo' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="get_allInfo"]').trigger("click")
  });
  it("trigger 'submit' alert check '店舗情報を変更しました'", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("店舗情報を変更しました")
  });
  it("trigger 'submit' alert check '店名を入力して下さい'", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("店名を入力して下さい")
  });
  it("trigger 'submit' alert check '店舗詳細を入力して下さい' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("店舗詳細を入力して下さい")
  });
  it("trigger 'submit' alert check '文字数は120文字までです' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                message: "OK",
              }],
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("文字数は120文字までです")
  });
  it("trigger 'submit(error)' alert check 'shop_name' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  shop_name: "shop_name",
                  description: "description",
                },
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("shop_name")
  });
  it("trigger 'submit(error)' alert check 'description' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  shop_name: undefined,
                  description: "description",
                },
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("description")
  });
  it("trigger 'submit(error)' alert check 'システムエラーが発生しました' ", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  shop_name: undefined,
                  description: undefined,
                },
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 1,
                  genre_id: 1,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy",
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          user: {
            id: 999
          }
        },
        $router: {
          push: jest.fn()
        }
      },
    } )
    await wrapper.setData({
      shopInfo: {
        shop_name: "shoptest",
        description: "testtesttest",
        area_id: 1,
        genre_id: 1,
        pic_path: "dummy",
      },
      imageData: "dummy",
      uploadFile: "dummy",
      shop_name: "shoptest",
      description: "testtesttest",
      area_name: "tokyo",
      vModelarea: "tokyo",
      areaCurrent: [
        "tokyo",
        "osaka"
      ],
      genre_name: "ramen",
      vModelgenre: "ramen",
      genreCurrent: [
        "ramen",
        "sushi"
      ],
      display: true,
    })
    window.alert = jest.fn()

    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});