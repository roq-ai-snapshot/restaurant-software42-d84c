import { OrderItemInterface } from 'interfaces/order-item';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface OrderInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  waiter_id: string;
  order_time: Date;
  total_price: number;
  discount?: number;
  payment_status: boolean;
  order_item?: OrderItemInterface[];
  user_order_customer_idTouser?: UserInterface;
  restaurant?: RestaurantInterface;
  user_order_waiter_idTouser?: UserInterface;
  _count?: {
    order_item?: number;
  };
}
