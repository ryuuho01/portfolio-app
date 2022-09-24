import { createLocalVue, mount } from "@vue/test-utils";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import Feedback from '@/components/Feedback.vue';
import App from "@/pages/mypage.vue";

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('Feedback', Feedback)
const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)
const customRule = {
  params: ['string'],
  message: '必須項目です',
  validate(value:any, {string}:any) {
    return value !== string;
  }
};
extend('custom_rule', customRule);

describe("mypage.vue test", () => {
  it("Reservation trigger 'destroy'(when favorites = 1 )", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    window.confirm = jest.fn().mockReturnValue(true)
    window.alert = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
  it("Reservation trigger 'destroy'(when favorites = 0)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    window.confirm = jest.fn().mockReturnValue(true)
    window.alert = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
  it("Reservation trigger 'destroy'(when confirm 'false')", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    window.confirm = jest.fn().mockReturnValue(false)
    window.alert = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="delete"]').trigger("click")
  })
  it("Moving to detail", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $router: {
          push:jest.fn()
        },
      },

    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="detail"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/detail/999")
  })
  it("Adding favorite(login)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          })),
        },
        $auth: {
          loggedIn: true,
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
  })
  it("Adding favorite(logout)", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          post: jest.fn(() => Promise.resolve({
            data: {
              statusText: "OK"
            }
          })),
        },
        $auth: {
          loggedIn: false,
        },
        $router: {
          push:jest.fn()
          },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    await wrapper.get('[data-test="addfavorite"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  })
  it("deleting favorite", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id:999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 1
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $auth: {
          loggedIn: false,
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 1
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id:999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        favorites: 1
      }],
    })
    await wrapper.get('[data-test="deletefavorite"]').trigger("click")
  })
  it("Modal open&close trigger 'modal", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-10 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
    })
    window.addEventListener = jest.fn().mockReturnValue(true)
    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="close1"]').trigger("click")
    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="close2"]').trigger("click")
  })
  it("Modal reservation trigger 'reservation' login check", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: false,
        },
        $router: {
          push:jest.fn()
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(wrapper.vm.$router.push).toBeCalledWith("/login")
  })
  it("Modal reservation trigger 'reservation alert-check' '日付を選択して下さい'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    const elm = document.createElement('input')
    elm.id = 'reservation_date'
    elm.innerText = ''
    jest.spyOn(document, 'getElementById').mockReturnValue(elm)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("日付を選択して下さい")
  })
  it("Modal reservation trigger 'reservation alert-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.resolve({
            data: {
              message: "Not found"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  })
  it("Modal reservation trigger 'reservation alert-check' '予約の変更が完了しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.resolve({
            data: {
              message: "No"
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
  })
  it("Modal reservation trigger 'reservation error-check' 'reservation_date'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: '2022-00-10 00:00:00',
                  reservation_time: '00:00:00',
                  num_members: '2022',
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("2022-00-10 00:00:00")
  })
  it("Modal reservation trigger 'reservation error-check' 'reservation_time'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: '00:00:00',
                  num_members: '2022',
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("00:00:00")
  })
  it("Modal reservation trigger 'reservation error-check' 'num_members'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: undefined,
                  num_members: '2022',
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("2022")
  })
  it("Modal reservation trigger 'reservation error-check' 'システムエラーが発生しました'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),
          delete: jest.fn(() => Promise.resolve({
            data: {
              statusText: "Deleted successfully"
            }
          })),
          put: jest.fn(() => Promise.reject({
            response: {
              data: {
                errors: {
                  reservation_date: undefined,
                  reservation_time: undefined,
                  num_members: undefined,
                }
              }
            }
          }))
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            name: "test",
            email: "test@test.com",
          }
        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(true)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
    expect(window.alert).toHaveBeenCalledWith("システムエラーが発生しました")
  })
  it("Modal reservation trigger 'reservation confirm false'", async () => {
    const wrapper = mount(App, {
      localVue,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: [{
                id: 999,
                user_id: 999,
                shop_id: 999,
                area_name: "東京",
                genre_name: "ラーメン",
                shop_name: "test",
                reservations: [{
                  user_id: 999,
                  reservation_date: '2022-00-10 00:00:00',
                  num_members: "10"
                }],
                favorites: [{
                  user_id: 999,
                  favorite: 0
                }]
              }],
            },
          })),

        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,

        },
      },
    })
    await wrapper.setData({
      userId: 999,
      userName: "test_name",
      shopCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test",
        reservations: [{
          user_id: 999
        }],
        favorites: [{
          user_id: 999,
          favorite: 0
        }]
      }],
      reservationsCurrent: [{
        id: 999,
        shop_name: "test",
        reservations: [{
          user_id: 999,
          reservation_date: '2022-00-00 00:00:00',
          num_members: "10"
        }],
      }],
      favoriteCurrent: [{
        id: 999,
        area_name: "東京",
        genre_name: "ラーメン",
        shop_name: "test"
      }],
      modalCurrent: {
        reservations: [{
          id: 999,
          reservation_date: '2022-00-00 00:00:00',
          shop_name: 'testshop',
        }]
      },
      reservationDate: '2022-00-00 00:00:00',
      changeTime: "10:00",
      changeNumMembers:"10",
    })
    await wrapper.get('[data-test="reservationDate"]').setValue("2022-00-10 00:00:00")
    await wrapper.get('[data-test="changeTime"]').setValue("10:00")
    await wrapper.get('[data-test="changeNumMembers"]').setValue("10")

    window.alert = jest.fn().mockReturnValue(true)
    document.getElementById = jest.fn().mockReturnValue('')
    window.confirm = jest.fn().mockReturnValue(false)

    await wrapper.get('[data-test="modal"]').trigger("click")
    await wrapper.get('[data-test="reservation"]').trigger("click")
  })
})