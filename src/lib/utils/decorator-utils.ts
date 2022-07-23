import { ENTITY_ID_METADATA_KEY_PREFIX } from "../decorator/input/EntityIdDecorator";
import { ENTITY_NAME_METADATA_KEY_PREFIX } from "../decorator/input/EntityNameDecorator";
import { getOwnPropertyNames } from "../handler/FormHandler";
import { isValuePresent } from "./object-utils";

function getPropertyNameMetadataHolder(object: any, metadataKey: string) {
  return (
    getOwnPropertyNames(object).find((propertyName) => {
      let metadataValue = getMetadataValue(object, propertyName, metadataKey);
      return isValuePresent(metadataValue);
    }) || ""
  );
}

function getMetadataValue(
  object: any,
  propertyName: string,
  metadataKey: string
): any {
  return Reflect.getMetadata(metadataKey, object, propertyName);
}

function getEntityNameVariable(object: any): string {
  return getPropertyNameMetadataHolder(object, ENTITY_NAME_METADATA_KEY_PREFIX);
}

function getEntityIdVariable(object: any): string {
  return getPropertyNameMetadataHolder(object, ENTITY_ID_METADATA_KEY_PREFIX);
}

export {
  getEntityNameVariable,
  getMetadataValue,
  getEntityIdVariable,
  getPropertyNameMetadataHolder,
};
