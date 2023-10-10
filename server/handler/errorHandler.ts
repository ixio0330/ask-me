import { NextResponse } from 'next/server';
import { CustomError } from '../error/index';

export const responseErrorHandler = (error: unknown) => {
  if (error instanceof CustomError) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode });
  }
  return NextResponse.json({ message: '서버 내부 오류가 발생했습니다' }, { status: 500 });
};
