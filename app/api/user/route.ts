
import { BadRequest } from '@/server/error';
import { responseErrorHandler } from '@/server/handler/errorHandler';
import UsersStorage from '@/server/storage/users';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email } = body;
  
    if (uid === undefined || uid === null) {
      throw new BadRequest('uid가 누락되었습니다.');
    }
  
    if (email === undefined || email === null) {
      throw new BadRequest('email이 누락되었습니다.');
    }
  
    const addResult = await UsersStorage.add(body);
    if (!addResult.success) {
      throw new BadRequest(addResult.message);
    }
    return NextResponse.json(addResult, { status: 200 });
  } catch (error) {
    return responseErrorHandler(error);
  }
}