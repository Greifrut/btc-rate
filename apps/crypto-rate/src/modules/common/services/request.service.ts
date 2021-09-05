import { IRequest } from '../../../typings/interfaces/IRequest';

export class RequestService implements IRequest {
  constructor(private readonly requestProvider: IRequest) {}
  get(url: string, config?: any): Promise<any> {
    return this.requestProvider.get(url, config);
  }
}
