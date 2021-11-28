const Validator = require("fastest-validator");

const {
	firstNameValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/firstNameValidationSchema");

const v = new Validator();

const firstNameValidation = {
	...firstNameValidationSchema,
};

const firstNameValidator = v.compile(firstNameValidation);

module.exports = { firstNameValidator, firstNameValidation };