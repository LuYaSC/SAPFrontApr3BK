export class BaseResponse<T> {
  isOk: boolean;
  message: string;
  body: T;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
