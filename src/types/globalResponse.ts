import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error: TError;
  meta?: TMeta;
  success: boolean;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
  image: string;
  description: string;
  isDeleted: boolean;
};

export type TCartItem = {
  productId: TProduct;
  quantity: number;
  price: number;
  subTotal: number;
  _id: string;
  cartItems: TCartItem[];
  totalPrice: number;
};

export type TUser = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

export type TCart = {
  user: TUser;
  cartItems: TCartItem[];
  totalPrice: number;
  cart?: TCartItem;
};
export type TOrder = {
  _id: string;
  email: string;
  status: string;
  product?:
    | {
        _id: string;
        email: string;
        cartItems: TCartItem[];
        totalPrice: number;
      }
    | string
    | null;
  quantity: number;
  totalPrice: number;
  transaction: {
    id: string;
    transactionStatus: string;
  };

  isDeleted: boolean;
};
