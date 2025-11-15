export interface ErrorResponse {
  message: string;
  statusCode: number;
  error: string;
  path: string;
  timestamp: string;
  fieldErrors?: { [key: string]: string };
}
