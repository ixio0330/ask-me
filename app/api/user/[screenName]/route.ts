import { BadRequest, NotFound } from '@/server/error';
import UsersStorage from '@/server/storage/users';
import { responseErrorHandler } from '@/server/handler/errorHandler';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params: { screenName } } : { params: { screenName: string }}) {
  try {
    if (screenName === undefined || screenName === null) {
      throw new BadRequest('screenName이 누락되었습니다.');
    }

    const findResult = await UsersStorage.getByScreenName(Array.isArray(screenName) ? screenName[0] : screenName);
    if (!findResult) {
      throw new NotFound('존재하지 않는 사용자입니다.');
    }

    return NextResponse.json(findResult);
  } catch (error: unknown) {
    return responseErrorHandler(error);
  }
}