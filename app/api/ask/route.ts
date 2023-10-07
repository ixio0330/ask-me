import { responseErrorHandler } from '@/server/middleware/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import { BadRequest, InternalServerError } from '@/server/error';
import AskStorage from '@/server/storage/ask';

export async function GET(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get('uid');
    const askId = req.nextUrl.searchParams.get('askId');
    const offset = req.nextUrl.searchParams.get('offset');
    const limit = req.nextUrl.searchParams.get('limit');

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }

    const uidToStr = Array.isArray(uid) ? uid[0] : uid;
    const getResult = askId ? 
      await AskStorage.getById({ uid: uidToStr, askId: askId as string }) : 
      await AskStorage.getAll({ 
        uid: uidToStr, 
        offset: Array.isArray(offset) ? offset[0] : offset, 
        limit: Array.isArray(limit) ? limit[0] : limit, 
      });
    
    if (!getResult.result) {
      throw new InternalServerError(getResult.message);
    }
    return Response.json(getResult.data, { status: 200 });
  } catch (error) {
    return responseErrorHandler(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  
}
