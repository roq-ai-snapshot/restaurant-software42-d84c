import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  order_order_customer_idTouser?: OrderInterface[];
  order_order_waiter_idTouser?: OrderInterface[];
  reservation?: ReservationInterface[];
  restaurant?: RestaurantInterface[];
  staff?: StaffInterface[];

  _count?: {
    order_order_customer_idTouser?: number;
    order_order_waiter_idTouser?: number;
    reservation?: number;
    restaurant?: number;
    staff?: number;
  };
}
