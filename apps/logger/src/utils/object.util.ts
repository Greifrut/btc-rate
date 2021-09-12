import { ObjectType } from '../typings/interfaces/config.interface';

export class ObjectUtil {
  static isObject<T>(value: T): value is T & ObjectType {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  static isEmpty<T extends ObjectType>(target: T): boolean {
    return Object.values(target).filter(Boolean).length === 0;
  }

  static merge<T extends ObjectType, U extends ObjectType>(
    target: T,
    source: U,
  ): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (
        ObjectUtil.isObject(targetValue) &&
        ObjectUtil.isObject(sourceValue)
      ) {
        Object.assign(sourceValue, ObjectUtil.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  }
}
