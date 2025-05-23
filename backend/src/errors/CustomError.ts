export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
} 