import { Config, Production } from './typings/interfaces/config.interface';
import { ObjectUtil } from './utils/object.util';

export default async (): Promise<Config> => {
  const { config: defaultConfig } = await import('./envs/default');
  const { config } = <{ config: Production }>(
    await import(`./envs/${process.env.NODE_ENV || 'development'}`)
  );
  return ObjectUtil.merge(defaultConfig, config);
};
