import { mount } from "@vue/test-utils";
import App from "@/pages/reservation_check/_id.vue";

describe("reservation_check.vue test", () => {
  it("Click check", async () => {
    const wrapper = mount(App, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({
            data: {
              data: {
                user_name: "test",
                reservation_date: "2022-03-10 21:00:00",
                num_members: 10,
              },
            },
          })),
        },
        $config: {
          baseURL: 'http://localhost:8000'
        },
        $auth: {
          loggedIn: true,
          user: {
            id: 999,
            authority: 1
          }
        },
        $route: {
          params: {
            id: 999
          }
        }
      },
    })
    await wrapper.setData({
      reservationCurrent: {
        user_name: "test",
        reservation_date: "2022-03-10 21:00:00",
        num_members: 10,
      }
    })
    await wrapper.get('[data-test="back"]').trigger("click");
  });
});