import { TQueryParams, TResponseRedux } from "../../../types/globalResponse";
import { baseApi } from "../../api/baseApi";
type TCartItem = {
  productId: string;
  price: number;
  quantity: number;
  cartItems?: object[];
};

type TCart = {
  _id: string;
  email: string;
  cart: TCartItem;
  totalPrice: number;
};

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
    }),
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart/addToCart",
        method: "POST",
        body: cartInfo,
      }),
    }),
  }),
});
export const { useAddToCartMutation, useGetAllCartsQuery } = cartApi;
