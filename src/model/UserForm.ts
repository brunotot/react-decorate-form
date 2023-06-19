import { Rule, validators } from "react-decorate-form";

export type UserFormFields = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  url: string;
  age: number;
};

export default class UserForm implements UserFormFields {
  @validators.string.MinLength(5)
  @validators.string.Required()
  firstName!: string;

  @validators.string.Required()
  lastName!: string;

  @validators.string.Required()
  @validators.string.Password({
    length: 3,
  })
  password!: string;

  @Rule((value: string) => ({
    key: "RandomValidator",
    message: 'confirmPassword must be "test"',
    valid: value === "test",
  }))
  confirmPassword!: string;

  @validators.string.URL()
  url!: string;

  @validators.number.ValueRange({ min: 18, max: 100 })
  age!: number;

  //@validators.boolean.AssertTrue("Passwords must match") NOT WORKING !!!
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  //@Validators.arrayNotEmpty()
  //@Validators.arrayEach(Validators.stringMaxLength(10)) !!!!!!
  @validators.array.Required()
  @validators.any.Truthy()
  //@validators.string.Email() NOT WORKING!!!
  hobbies!: string[];
}
