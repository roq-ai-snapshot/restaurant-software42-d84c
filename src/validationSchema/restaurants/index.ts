import * as yup from 'yup';
import { menuCategoryValidationSchema } from 'validationSchema/menu-categories';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menu_category: yup.array().of(menuCategoryValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
