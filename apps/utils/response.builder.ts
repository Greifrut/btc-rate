export interface IResponseBuilder {
  addSyncMethod(method: any): ThisType<IResponseBuilder>;

  addAsyncMethod(method: any): ThisType<IResponseBuilder>;

  addArgument(arg: any): void;

  runSyncMethod(): ThisType<IResponseBuilder>;

  runAsyncMethod(): Promise<ThisType<IResponseBuilder>>;

  getResponse(): any;
}

export class ResponseBuilder implements IResponseBuilder {
  private syncMethod: any;
  private asyncMethod: any;
  private readonly args: any[] = [];

  constructor(private readonly thisArg) {}

  private response: [response: any | null, error: string | null] = [
    null,
    'Empty response',
  ];

  addSyncMethod(method: any) {
    this.syncMethod = method;
    return this;
  }

  addAsyncMethod(method: any) {
    this.asyncMethod = method;
    return this;
  }

  addArgument(arg: any) {
    this.args.push(arg);
  }

  runSyncMethod() {
    if (!this.syncMethod) {
      this.response = [null, 'No sync method'];
      return this;
    }

    try {
      const response = this.syncMethod.bind(this.thisArg, this.args)();
      this.response = [response, null];
    } catch (e) {
      this.response = [null, e.message];
    } finally {
      return this;
    }
  }

  async runAsyncMethod() {
    if (!this.asyncMethod) {
      this.response = [null, 'No async method'];
      return this;
    }

    try {
      const response = await this.asyncMethod.bind(this.thisArg, this.args)();
      this.response = [response, null];
    } catch (e) {
      this.response = [null, e.message];
    } finally {
      return this;
    }
  }

  getResponse() {
    return this.response;
  }
}
