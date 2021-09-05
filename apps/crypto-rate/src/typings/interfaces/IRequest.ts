export interface IRequest {
  get(url: string, config?: any): Promise<any>;
}
