import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import App from "@/components/ShopCreate.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
const { required, max } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('max', max)
const customRule = {
  params: ['string'],
  message: '必須項目です',
  validate(value:any, {string}:any) {
    return value !== string;
  }
};
extend('custom_rule', customRule);

describe("ShopCreate.vue test", () => {
  it("Data check when filter = 0", async () => {
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
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
        }
      },
    } )
    await wrapper.setData({
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'area'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="areaTrue"]').trigger("click")
    await wrapper.get('[data-test="insertArea"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("地域名を入力して下さい")
    await wrapper.get('[id="area"]').setValue("tokyo")
    await wrapper.get('[data-test="insertArea"]').trigger("click")
  });
  it("Data check when filter = 0", async () => {
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
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
        }
      },
    } )
    await wrapper.setData({
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="genreTrue"]').trigger("click")
    await wrapper.get('[data-test="insertGenre"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("ジャンル名を入力して下さい")
    await wrapper.get('[id="genre"]').setValue("ramen")
    await wrapper.get('[data-test="insertGenre"]').trigger("click")
  });
  it("Data check when filter = 0", async () => {
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
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
  });
  it("pic_pathtest", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: "pic_pathtest",
                  shop_name: "shop_nametest",
                  area_name: "area_nametest",
                  genre_name: "genre_nametest",
                  description: "descriptiontest",
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("pic_pathtest")
  });
  it("shop_nametest", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: undefined,
                  shop_name: "shop_nametest",
                  area_name: "area_nametest",
                  genre_name: "genre_nametest",
                  description: "descriptiontest",
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("shop_nametest")
  });
  it("area_nametest", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: undefined,
                  shop_name: undefined,
                  area_name: "area_nametest",
                  genre_name: "genre_nametest",
                  description: "descriptiontest",
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("area_nametest")
  });
  it("genre_nametest", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: undefined,
                  shop_name: undefined,
                  area_name: undefined,
                  genre_name: "genre_nametest",
                  description: "descriptiontest",
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("genre_nametest")
  });
  it("descriptiontest", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: undefined,
                  shop_name: undefined,
                  area_name: undefined,
                  genre_name: undefined,
                  description: "descriptiontest",
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("descriptiontest")
  });
  it("システムエラーが発生しました", async () => {
    const wrapper = mount( App, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  pic_path: undefined,
                  shop_name: undefined,
                  area_name: undefined,
                  genre_name: undefined,
                  description: undefined,
                }
              },
            },
          })),
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                shop: {
                  shop_name: "shoptest",
                  description: "testtesttest",
                  area_id: 555,
                  genre_id: 555,
                },
                area_name: "tokyo",
                genre_name: "ramen",
                pic_path: "dummy"
              }],
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
      pic_path: "pictest",
      shop_name: "shoptest",
      description: "testtesttest",
      area: null,
      genre: null,
      uploadFile: "dummy",
      vModelarea: "tokyo",
      vModelgenre: "ramen"
    })
    Object.defineProperty(window, "location", { value: {} })
    window.alert = jest.fn()
    const elm = document.createElement('input')
    elm.id = 'genre'
    elm.value = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)
    await wrapper.get('[data-test="submit"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  });
});