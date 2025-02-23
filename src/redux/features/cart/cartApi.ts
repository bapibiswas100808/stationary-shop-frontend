import {
  TCart,
  TQueryParams,
  TResponseRedux,
} from "../../../types/globalResponse";
import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cart",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TCart>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: (result) => (result ? [{ type: "Cart", id: "LIST" }] : []),
    }),
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart/addToCart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});
export const { useAddToCartMutation, useGetAllCartsQuery } = cartApi;
