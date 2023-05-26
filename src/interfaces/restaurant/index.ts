import { MenuCategoryInterface } from 'interfaces/menu-category';
import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { StaffInterface } from 'interfaces/staff';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  owner_id: string;
  menu_category?: MenuCategoryInterface[];
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  staff?: StaffInterface[];
  user?: UserInterface;
  _count?: {
    menu_category?: number;
    order?: number;
    reservation?: number;
    staff?: number;
  };
}
