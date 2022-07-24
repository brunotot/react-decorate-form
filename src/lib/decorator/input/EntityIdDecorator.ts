import "reflect-metadata";
import { uuidv4 } from "../validator/BaseValidatorDecorator";

export const ENTITY_ID_METADATA_KEY_PREFIX = "input:entity:id";

export enum EntityIdStrategy {
  NONE = 0,
  AUTO_GENERATED,
}

export default function EntityId(
  strategy: EntityIdStrategy = EntityIdStrategy.NONE
) {
  return function (target: any, key: string) {
    let value: any = target[key];
    if (strategy === EntityIdStrategy.NONE) {
      target[key] = value;
    } else {
      target[key] = uuidv4();
    }
    Reflect.defineMetadata(
      ENTITY_ID_METADATA_KEY_PREFIX,
      strategy,
      target,
      key
    );
  };
}
