import { BadRequest, InternalServerError } from '@/server/error';
import { responseErrorHandler } from '@/server/middleware/errorHandler';
import { NextResponse } from 'next/server';
import ReplyStorage from '@/server/storage/reply';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, askId, reply } = body;

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (askId === undefined || askId === null) {
      throw new BadRequest('askId가 누락되었습니다.');
    }

    if (reply === undefined || reply === null || reply === '') {
      throw new BadRequest('reply가 누락되었습니다.');
    }
  
    const replyResult = await ReplyStorage.add(body);
    if (!replyResult.result) {
      throw new InternalServerError(replyResult.message);
    }

    return NextResponse.json(replyResult.data);
  } catch (error: unknown) {
    return responseErrorHandler(error);
  }
}