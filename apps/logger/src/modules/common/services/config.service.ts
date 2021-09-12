import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';
import { Config } from '../../../typings/interfaces/config.interface';

export class ConfigService<K = Config> extends NestConfig<K> {
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(path, { infer: true });
    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    return value;
  }
}
