import MetadataKey from "../constants/MetadataKey";
import ReflectService from "./ReflectService";
import {
	EvaluateValidationType,
	EvaluateValidationTypes,
} from "./ValidatorService";

export default class DecoratorService {
	private target: any;
	private validators: EvaluateValidationTypes;

	constructor(target: Object) {
		this.target = target;
		const targetAny = this.target as any;
		const keys = [
			...ReflectService.getClassFieldNames(targetAny),
			...ReflectService.getClassGetterNames(targetAny),
		];
		this.validators = this.buildValidators(keys);
	}

	buildTarget<T>(formState: any): T {
		const object = new this.target();
		Object.entries(formState).forEach(([key, value]) => (object[key] = value));
		return object as T;
	}

	getAllValidators(): EvaluateValidationTypes {
		return this.validators;
	}

	getFieldValidators(property: string): EvaluateValidationType<any>[] {
		return ReflectService.getMetadata(
			MetadataKey.VALIDATOR_FIELD,
			this.target,
			property
		);
	}

	private buildValidators(keys: string[]) {
		return keys.reduce(
			(obj, property) => ({
				...obj,
				[property]: this.getFieldValidators(property),
			}),
			{}
		);
	}
}
