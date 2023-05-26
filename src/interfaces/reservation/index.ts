import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReservationInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  reservation_time: Date;
  table_preferences?: string;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
