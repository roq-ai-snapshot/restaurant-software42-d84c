import * as yup from 'yup';
import { orderItemValidationSchema } from 'validationSchema/order-items';

export const orderValidationSchema = yup.object().shape({
  order_time: yup.date().required(),
  total_price: yup.number().integer().required(),
  discount: yup.number().integer(),
  payment_status: yup.boolean().required(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
  waiter_id: yup.string().nullable().required(),
  order_item: yup.array().of(orderItemValidationSchema),
});
