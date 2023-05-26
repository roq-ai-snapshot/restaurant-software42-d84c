import { OrderItemInterface } from 'interfaces/order-item';
import { MenuCategoryInterface } from 'interfaces/menu-category';

export interface MenuItemInterface {
  id?: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  order_item?: OrderItemInterface[];
  menu_category?: MenuCategoryInterface;
  _count?: {
    order_item?: number;
  };
}
