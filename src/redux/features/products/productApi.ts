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
  image: string;
  description: string;
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      // This function now expects productId and productInfo as an object
      query: ({ productId, productInfo }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: productInfo,
      }),
      invalidatesTags: ({ productId }) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id: productId },
      ],
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
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
