import { TQueryParams, TResponseRedux } from "../../../types/globalResponse";
import { baseApi } from "../../api/baseApi";
type TProduct = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
} = productApi;
