import * as yup from 'yup';
import { menuItemValidationSchema } from 'validationSchema/menu-items';

export const menuCategoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().nullable().required(),
  menu_item: yup.array().of(menuItemValidationSchema),
});
