import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getSingleUser: builder.query({
      query: (userInfo) => ({
        url: `users/allUser/${userInfo}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updates }) => {
        console.log("🔍 ID passed:", id); // This will help you verify that the ID is being passed correctly.
        return {
          url: `/users/updateAddress/${id}`,
          method: "PUT",
          body: updates,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
