import axios from 'axios';
import queryString from 'query-string';
import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from '../../interfaces';

export const getOrders = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrder = async (order: OrderInterface) => {
  const response = await axios.post('/api/orders', order);
  return response.data;
};

export const updateOrderById = async (id: string, order: OrderInterface) => {
  const response = await axios.put(`/api/orders/${id}`, order);
  return response.data;
};

export const getOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};
