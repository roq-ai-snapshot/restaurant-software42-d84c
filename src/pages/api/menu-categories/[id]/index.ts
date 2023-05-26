import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menuCategoryValidationSchema } from 'validationSchema/menu-categories';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenuCategoryById();
    case 'PUT':
      return updateMenuCategoryById();
    case 'DELETE':
      return deleteMenuCategoryById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenuCategoryById() {
    const data = await prisma.menu_category.findFirst(convertQueryToPrismaUtil(req.query, 'menu_category'));
    return res.status(200).json(data);
  }

  async function updateMenuCategoryById() {
    await menuCategoryValidationSchema.validate(req.body);
    const data = await prisma.menu_category.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMenuCategoryById() {
    const data = await prisma.menu_category.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
