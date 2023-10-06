import UsersController from '@/server/controllers/users';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Method } from '@/server/controllers/users';
import errorHandler from '@/server/middleware/errorHandler';
import { BadRequest, CustomError, NotFound } from '@/server/error';
import UsersStorage from '@/server/storage/users';
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const screenName = req.nextUrl.searchParams.get('screenName');

    if (screenName === undefined || screenName === null) {
      throw new BadRequest('screenName이 누락되었습니다.');
    }

    const findResult = await UsersStorage.getByScreenName(Array.isArray(screenName) ? screenName[0] : screenName);
    if (!findResult) {
      throw new NotFound('존재하지 않는 사용자입니다.');
    }

    return Response.json(findResult);
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      return Response.json({ message: error.message });
    }
    return Response.json({ message: '알 수 없는 오류가 발생했습니다.' })
  }
}