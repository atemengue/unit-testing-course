class BadGatewayError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'BadGateway');
    this.name = 'BadGatewayError';
    this.status = 502;
  }
}

class BadRequestError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'BadRequest');
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

class ForbiddenError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'Forbidden');
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

class NotFoundError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'Resource not found');
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ParamsError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'Invalid parameters');
    this.name = 'ParamError';
    this.status = 422;
  }
}
class UnauthorizedError extends Error {
  status: number;

  constructor(message?: string) {
    super(message || 'Invalid authentication');
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}

export {
  BadGatewayError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ParamsError,
  UnauthorizedError
};

