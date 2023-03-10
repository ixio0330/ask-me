import { CustomError } from './../error/index';
import type { NextApiResponse } from 'next'

const errorHandler = (error: unknown, res: NextApiResponse) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
};

export default errorHandler;