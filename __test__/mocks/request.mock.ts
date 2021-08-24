import { IRequest } from "../../src/types/interfaces/IRequest";

export class RequestMock implements IRequest {
  get(url: string, config?: any): Promise<any> {
    return Promise.resolve({
      data: {
        bpi: { UAH: { rate_float: 1 } },
      },
    });
  }
}
