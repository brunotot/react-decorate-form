import "reflect-metadata";
import MetadataKey from "../constants/MetadataKey";
import InferredType from "../constants/InferredType";

class ReflectService {
	getClassGetterType(target: any, property: string): InferredType {
		return this.getFieldType(target, property, "design:returntype");
	}

	getClassFieldType(target: any, property: string): InferredType {
		return this.getFieldType(target, property, "design:type");
	}

	getClassFieldNames(constructor: { new (): any }): string[] {
		return this.getPropertyNames(new constructor());
	}

	getClassGetterNames(constructor: { new (): any }): string[] {
		return this.getPropertyNames(new constructor().__proto__);
	}

	hasMetadata(key: MetadataKey, clazz: Object, property: string) {
		return Reflect.hasMetadata(key, clazz, property);
	}

	getMetadata<T>(key: MetadataKey, clazz: Object, property: string): T[] {
		return Reflect.getMetadata(key, clazz, property) ?? [];
	}

	setMetadata<T>(
		key: MetadataKey,
		value: T,
		clazz: Object,
		property: string,
		equalityFn?: (value: T) => any
	): void {
		if (this.hasMetadata(key, clazz, property)) {
			const equalityFnNonNull = equalityFn ?? ((o: any) => o);
			const current = this.getMetadata<T>(key, clazz, property);
			const exists = current.some(
				(arg) => equalityFnNonNull(arg) === equalityFnNonNull(value)
			);
			if (!exists) {
				current.push(value);
				Reflect.defineMetadata(key, current, clazz, property);
			}
			return;
		}
		Reflect.defineMetadata(key, [value], clazz, property);
	}

	private getPropertyNames(object: any): string[] {
		return Object.getOwnPropertyNames(object).filter(
			(property) => property !== "constructor"
		);
	}

	private getFieldType(
		target: any,
		property: string,
		identifier: string
	): InferredType {
		const meta = Reflect.getMetadata(identifier, target, property);
		if (!meta) {
			return InferredType.VOID;
		}
		const type = meta.name;
		for (const inferredType in InferredType) {
			if ((InferredType as any)[inferredType] === type) {
				return type;
			}
		}
		return InferredType.GENERIC_OBJECT;
	}
}

export default new ReflectService();
