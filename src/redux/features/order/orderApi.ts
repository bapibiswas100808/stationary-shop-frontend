import { TQueryParams, TResponseRedux } from "../../../types/globalResponse";
import { baseApi } from "../../api/baseApi";
type TOrder = {
  email: string;
  product: string | null; // ObjectId reference
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
          url: "/getAllOrder",
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
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/singleOrder/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
} = orderApi;
