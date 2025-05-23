import { CustomError } from "../errors/CustomError";

export const errorHandler = (error: Error) => {
  console.error("GraphQL Error:", error);

  if (error instanceof CustomError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Handle TypeORM errors
  if (error.name === "QueryFailedError") {
    return {
      message: "Database operation failed",
      code: "DATABASE_ERROR",
      statusCode: 500,
    };
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    return {
      message: error.message,
      code: "VALIDATION_ERROR",
      statusCode: 400,
    };
  }

  // Default error
  return {
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
  };
}; 