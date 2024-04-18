import { ZodError } from "zod";

type TypeErrorDetails = ZodError;

type ErrorData = {
  data: any;
  status: number;
  error?: TypeErrorDetails;
};

export class ResponseTypeError extends TypeError {
  name: string;
  data: any;
  status: number;
  error?: TypeErrorDetails;

  constructor(message: string, errorData: ErrorData) {
    super(message);
    this.name = "ResponseTypeError";
    this.data = errorData.data;
    this.error = errorData.error;
    this.status = errorData.status;
  }
}
