import NotNull from "../decorators/validators/any/NotNull";
import Size from "../decorators/validators/array/Size";
import AssertFalse from "../decorators/validators/boolean/AssertFalse";
import AssertTrue from "../decorators/validators/boolean/AssertTrue";
import NotEmpty from "../decorators/validators/compound/NotEmpty";
import Rule from "../decorators/validators/custom/Rule";
import Digits from "../decorators/validators/number/Digits";
import Max from "../decorators/validators/number/Max";
import Min from "../decorators/validators/number/Min";
import Range from "../decorators/validators/number/Range";
import Email from "../decorators/validators/string/Email";
import ExactLength from "../decorators/validators/string/ExactLength";
import MaxLength from "../decorators/validators/string/MaxLength";
import MinLength from "../decorators/validators/string/MinLength";
import Password from "../decorators/validators/string/Password";
import Pattern from "../decorators/validators/string/Pattern";
import RangeLength from "../decorators/validators/string/RangeLength";
import URL from "../decorators/validators/string/URL";

const any = {
	NotNull,
};

const compound = {
	...any,
	NotEmpty,
};

const array = {
	...any,
	Size,
	NotEmpty: compound.NotEmpty,
};

const boolean = {
	...any,
	AssertFalse,
	AssertTrue,
};

const number = {
	...any,
	Digits,
	Max,
	Min,
	Range,
};

const string = {
	...any,
	NotEmpty: compound.NotEmpty,
	Email,
	ExactLength,
	MaxLength,
	MinLength,
	Password,
	Pattern,
	RangeLength,
	URL,
};

const custom = {
	Rule,
};

const validators = {
	any,
	array,
	boolean,
	compound,
	number,
	string,
	custom,
};

export { validators };
