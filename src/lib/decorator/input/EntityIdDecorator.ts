import "reflect-metadata";
export const ENTITY_ID_METADATA_KEY_PREFIX = "input:entity:id";

export default function EntityId() {
  return function (target: any, key: string) {
    let value: any = target[key];
    target[key] = value;
    Reflect.defineMetadata(ENTITY_ID_METADATA_KEY_PREFIX, key, target, key);
  };
}
