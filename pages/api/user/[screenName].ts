import UsersController from '@/server/controllers/users';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Method } from '@/server/controllers/users';
import errorHandler from '@/server/middleware/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as Method;
  try {
    res.status(200).json(await UsersController[method](req));
  } catch (error) {
    return errorHandler(error, res);
  }
}
