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
    getAllUser: builder.query({
      query: () => ({
        url: `users/allUser`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updates }) => {
        return {
          url: `/users/updateAddress/${id}`,
          method: "PUT",
          body: updates,
        };
      },
    }),
    updateUserStatus: builder.mutation({
      query: (email) => {
        return {
          url: `users/changeStatus/${email}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} = userApi;
