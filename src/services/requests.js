import axios from "axios";
import {
  ORDERS_API_URI,
  ORDER_CREATE_URI,
  ORDER_PATCH_URI,
  ORDER_DELETE_URI,
  USERS_API_URI,
} from "../constants/constants";

export const getAllOrders = async () => {
  try {
    return {
      hasExternalError: false,
      data: await axios.get(ORDERS_API_URI),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};

export const createOrder = async (orderPayload) => {
  try {
    return {
      hasExternalError: false,
      data: await axios.post(ORDER_CREATE_URI, orderPayload),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};

export const patchOrder = async (orderId, partialPayload) => {
  try {
    return {
      hasExternalError: false,
      data: await axios.patch(ORDER_PATCH_URI + orderId, partialPayload),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};

export const deleteOrder = async (orderId) => {
  try {
    return {
      hasExternalError: false,
      data: await axios.delete(ORDER_DELETE_URI + orderId),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    return {
      hasExternalError: false,
      data: await axios.get(USERS_API_URI),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};
