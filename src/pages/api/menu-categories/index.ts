import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menuCategoryValidationSchema } from 'validationSchema/menu-categories';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenuCategories();
    case 'POST':
      return createMenuCategory();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenuCategories() {
    const data = await prisma.menu_category.findMany(convertQueryToPrismaUtil(req.query, 'menu_category'));
    return res.status(200).json(data);
  }

  async function createMenuCategory() {
    await menuCategoryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.menu_item?.length > 0) {
      const create_menu_item = body.menu_item;
      body.menu_item = {
        create: create_menu_item,
      };
    } else {
      delete body.menu_item;
    }
    const data = await prisma.menu_category.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
