import { useEffect, useMemo, useState } from "react";
import {
  Class,
  ErrorData,
  ValidationHandler,
  ValidationClass,
} from "typescript-decorator-validation";

export type OnChangeHandlerType = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type DecoratedValidationType<T> = {
  value: ValidationClass<T>;
  setValue: React.Dispatch<React.SetStateAction<ValidationClass<T>>>;
  isValid: boolean;
  onChange: OnChangeHandlerType;
  detailedErrors: ErrorData<T>;
  errors: ErrorData<T>;
};

export type OnSubmitHandler<K> = (model: K) => void;

export default function useDecoratedValidation<T>(
  initialValue: ValidationClass<T>,
  model: Class<T>
): DecoratedValidationType<T> {
  const [value, setValue] = useState<ValidationClass<T>>(initialValue);
  const validationHandler = useMemo(
    () => new ValidationHandler<T>(model as any),
    []
  );
  const [detailedErrors, setDetailedErrors] = useState<ErrorData<T>>({} as any);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setDetailedErrors(validationHandler.getErrors(value as any));
  }, [value]);

  const isValid = !validationHandler.hasErrors(value as any);

  return {
    isValid,
    value,
    setValue,
    onChange,
    errors: detailedErrors,
    detailedErrors,
  };
}
