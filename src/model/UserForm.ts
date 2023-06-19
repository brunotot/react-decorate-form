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
  @validators.string.Size({ min: 5 })
  @validators.string.NotEmpty()
  firstName!: string;

  @validators.string.NotEmpty()
  lastName!: string;

  @validators.string.NotEmpty()
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

  @validators.number.Range({ min: 18, max: 100 })
  age!: number;

  //@validators.boolean.AssertTrue("Passwords must match") NOT WORKING !!!
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
  // TODO Nepotrebno
  set passwordsMatch(value: string) {}

  //@Validators.arrayNotEmpty()
  //@Validators.arrayEach(Validators.stringMaxLength(10)) !!!!!!
  @validators.array.NotEmpty()
  @validators.any.Truthy()
  //@validators.string.Email() NOT WORKING!!!
  hobbies!: string[];
}
