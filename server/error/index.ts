export class CustomError extends Error {
  private _statusCode: number = 0;
  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
  }
  get statusCode(): number {
    return this._statusCode;
  }
}

export class BadRequest extends CustomError {
  constructor(message: string = '잘못된 요청입니다.') {
    super(message, 400);
  }
}

export class NotFound extends CustomError {
  constructor(message: string = '존재하지 않습니다.') {
    super(message, 404);
  }
}

export class NotAllowedMethod extends CustomError {
  constructor(message: string = '사용할 수 없는 메소드입니다.') {
    super(message, 405);
  } 
}

export class NotValidToken extends CustomError {
  constructor(message: string = '토큰이 유효하지 않습니다.') {
    super(message, 419);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = '서버 내부에서 오류가 발생했습니다.') {
    super(message, 500);
  }
}