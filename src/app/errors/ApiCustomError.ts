
class ApiCustomError extends Error {
  customErrors?: { field: string; code: string; message: string }[];

  constructor(
    message: string | undefined,
    customErrors?: { field: string;message: string ,code:string}[],
    stack = ""
  ) {
    super(message);
    if (customErrors) {
      this.customErrors = customErrors;
    }
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiCustomError;