import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  Class,
  ValidationHandler,
  ErrorData,
} from "typescript-decorator-validation";

export type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type FormProps<T> = HTMLFormProps & {
  handleSubmit: (data: T) => any;
  model: Class<T>;
  value: any;
};

export const FormContext = createContext<FormContextType<any>>(null as any);

export type FormContextType<T> = {
  state: T;
  errors: ErrorData<T>;
  validationHandler: ValidationHandler<T>;
};

export default function Form<T>(props: FormProps<T>) {
  const { model, value, handleSubmit, ...args } = props;
  const [errors, setErrors] = useState<ErrorData<T>>({} as any);
  const validationHandler = useMemo(() => new ValidationHandler(model), []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validationHandler.hasErrors(value)) {
      //TODO
      //handleSubmit(validationHandler.buildInstance(value));
    }
  };

  useEffect(() => setErrors(validationHandler.getErrors(value)), [value]);

  const context = {
    state: value,
    validationHandler,
    errors,
  };

  return (
    <FormContext.Provider value={context}>
      <form {...args} onSubmit={onSubmit}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}
