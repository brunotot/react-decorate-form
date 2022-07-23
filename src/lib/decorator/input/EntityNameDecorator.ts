import "reflect-metadata";

export const ENTITY_NAME_METADATA_KEY_PREFIX = "input:entity:name";

export default function EntityName() {
  return function (target: any, key: string) {
    Reflect.defineMetadata(ENTITY_NAME_METADATA_KEY_PREFIX, key, target, key);
  };
}
