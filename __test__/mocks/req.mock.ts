export class ReqMock {
  constructor(private readonly _body, private readonly _headers) {}

  get query() {
    return {};
  }

  get body() {
    return this._body;
  }

  get headers() {
    return this._headers;
  }
}
