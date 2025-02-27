import {
  TCartItem,
  TQueryParams,
  TResponseRedux,
} from "../../../types/globalResponse";
import { baseApi } from "../../api/baseApi";
type TOrder = {
  _id: string;
  email: string;
  product: {
    _id: string;
    email: string;
    cartItems: TCartItem[];
    totalPrice: number;
  } | null;
  quantity: number;
  totalPrice: number;
  status: "pending" | "shipping" | "cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  isDeleted: boolean;
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders/getAllOrder",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createOrder: builder.mutation({
      query: () => ({
        url: "/orders/createOrder",
        method: "POST",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/changeStatus/${id}`,
        method: "PUT",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/deleteOrder/${id}`,
        method: "PUT",
      }),
    }),
    getSingleOrder: builder.query({
      query: (email) => ({
        url: `orders/singleOrder/${email}`,
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `orders/verifyPayment`,
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useVerifyOrderQuery,
} = orderApi;
