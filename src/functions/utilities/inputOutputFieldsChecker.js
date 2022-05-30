const {
  appErrors: {
    INPUT_FIELDS_OVERLOAD,
    INPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = require("@/variables/errors/appErrors");
const {
  getObjectLength,
  customTypeof,
} = require("@/functions/utilities/utils");

const checkInputFields = (input, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (customTypeof(selectedFields).type.undefined) {
    return fn(true);
  }

  const checkFields = (input, fields) => {
    const inputLength = getObjectLength(input);
    const fieldsLength = getObjectLength(fields);

    if (inputLength !== fieldsLength) {
      if (inputLength < fieldsLength) {
        return fn(false, INPUT_FIELDS_MISSING);
      } else {
        return fn(false, INPUT_FIELDS_OVERLOAD);
      }
    }

    for (const key in fields) {
      if (customTypeof(input[key]).type.undefined) {
        fn(false, INPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof(fields[key]).type.object) {
        if (!customTypeof(input[key]).type.object) {
          fn(false, INPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(input[key], fields[key]);
      }
    }

    return result;
  };

  checkFields(input, selectedFields);

  return result;
};

const checkOutputFields = (output, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (customTypeof(selectedFields).type.undefined) {
    return fn(true);
  }

  const checkFields = (output, fields) => {
    const outputLength = getObjectLength(output);
    const fieldsLength = getObjectLength(fields);

    if (outputLength !== fieldsLength) {
      if (outputLength < fieldsLength) {
        return fn(false, OUTPUT_FIELDS_MISSING);
      } else {
        return fn(false, OUTPUT_FIELDS_OVERLOAD);
      }
    }

    for (const key in fields) {
      if (customTypeof(output[key]).type.undefined) {
        fn(OUTPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof(fields[key]).type.object) {
        if (!customTypeof(output[key]).type.object) {
          fn(OUTPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(output[key], fields[key]);
      }
    }

    return result;
  };

  checkFields(output, selectedFields);

  return result;
};

module.exports = { checkInputFields, checkOutputFields };
