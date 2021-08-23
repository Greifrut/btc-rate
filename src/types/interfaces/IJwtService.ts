export interface IJwtService {
  create({ email, password }): string;

  verify(pubToken: string): Promise<boolean>;
}
