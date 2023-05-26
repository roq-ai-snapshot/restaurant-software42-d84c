import axios from 'axios';
import queryString from 'query-string';
import { MenuCategoryInterface } from 'interfaces/menu-category';
import { GetQueryInterface } from '../../interfaces';

export const getMenuCategories = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menu-categories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenuCategory = async (menuCategory: MenuCategoryInterface) => {
  const response = await axios.post('/api/menu-categories', menuCategory);
  return response.data;
};

export const updateMenuCategoryById = async (id: string, menuCategory: MenuCategoryInterface) => {
  const response = await axios.put(`/api/menu-categories/${id}`, menuCategory);
  return response.data;
};

export const getMenuCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menu-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};
