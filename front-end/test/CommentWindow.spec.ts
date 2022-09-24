import { mount } from "@vue/test-utils";
import App from "@/components/CommentWindow.vue";

describe("CommentWindow.vue test", () => {
  it("Data check when filter = 0", async () => {
    const wrapper = mount( App )
    await wrapper.setData({
      shopCurrent: {
        comments: [
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 2
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 3
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 4
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 5
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
        ],
      },
      comments: ['2022-00-00 00:00:00'],
      pages: 1,
      filter: "0",
      display: true,
      currentPage: 1,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="previousPage"]').trigger("click")
    await wrapper.get('[data-test="ind(index-1)"]').trigger("click")
    await wrapper.get('[data-test="nextPage"]').trigger("click")
  });
  it("Data check when filter = 1", async () => {
    const wrapper = mount( App )
    await wrapper.setData({
      shopCurrent: {
        comments: [
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 2
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 3
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 4
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 5
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
        ],
      },
      comments: ['2022-00-00 00:00:00'],
      pages: 1,
      filter: "1",
      display: true,
      currentPage: 1,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="previousPage"]').trigger("click")
    await wrapper.get('[data-test="ind(index-1)"]').trigger("click")
    await wrapper.get('[data-test="nextPage"]').trigger("click")
  });
  it("Data check when filter = 2", async () => {
    const wrapper = mount( App )
    await wrapper.setData({
      shopCurrent: {
        comments: [
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 2
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 3
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 4
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 5
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
        ],
      },
      comments: ['2022-00-00 00:00:00'],
      pages: 1,
      filter: "2",
      display: true,
      currentPage: 1,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="previousPage"]').trigger("click")
    await wrapper.get('[data-test="ind(index-1)"]').trigger("click")
    await wrapper.get('[data-test="nextPage"]').trigger("click")
  });
  it("Data check when filter = 3", async () => {
    const wrapper = mount( App )
    await wrapper.setData({
      shopCurrent: {
        comments: [
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 2
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 3
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 4
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 5
          },
          {
            comment: "comment",
            updated_at: "2022-00-10 00:00:00",
            evaluation: 1
          },
        ],
      },
      comments: ['2022-00-00 00:00:00'],
      pages: 1,
      filter: "3",
      display: true,
      currentPage: 1,
    })
    window.alert = jest.fn()
    await wrapper.get('[data-test="previousPage"]').trigger("click")
    await wrapper.get('[data-test="ind(index-1)"]').trigger("click")
    await wrapper.get('[data-test="nextPage"]').trigger("click")
  });
});