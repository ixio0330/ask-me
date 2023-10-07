import { responseErrorHandler } from '@/server/middleware/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import { BadRequest, InternalServerError, NotValidToken } from '@/server/error';
import AskStorage from '@/server/storage/ask';
import firebaseAdmin from '@/common/firebase/admin';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, ask } = body;
  
    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (ask === undefined || ask === null) {
      throw new BadRequest('ask가 누락되었습니다.');
    }
  
    const addResult = await AskStorage.add(body);
    if (!addResult.result) {
      throw new InternalServerError(addResult.message);
    }
    return Response.json(addResult, { status: 200 });
  } catch(error) {
    return responseErrorHandler(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    if (token === null) {
      throw new NotValidToken('권한이 없습니다.');
    }

    let tokenUid: null | string = null;
    try {
      const decode = await firebaseAdmin.Auth.verifyIdToken(token);
      tokenUid = decode.uid;
    } catch (error) {
      throw new NotValidToken();
    }

    const body = await req.json();
    const { uid, askId, deny } = body;

    if (uid !== tokenUid) {
      throw new BadRequest('수정 권한이 없습니다.');
    }

    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (askId === undefined || askId === null) {
      throw new BadRequest('askId가 누락되었습니다.');
    }

    if (deny === undefined || deny === null) {
      throw new BadRequest('deny가 누락되었습니다.');
    }

    const addResult = await AskStorage.updateAskStatus(body);
    if (!addResult.result) {
      throw new InternalServerError(addResult.message);
    }
    return addResult.data;
  } catch(error) {
    return responseErrorHandler(error);
  }
}