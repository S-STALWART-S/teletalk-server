const { errorThrower } = require("~/functions/utilities/utils");
const {
  contactValidator,
} = require("~/validators/userValidators/contactValidator");

const contactValidatorMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName, firstName, lastName } =
      req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const validationResult = await contactValidator({
      ...cellphone,
      firstName,
      lastName,
    });

    errorThrower(validationResult !== true, validationResult);

    next();
  } catch (error) {
    logger.log("contactValidatorMiddleware catch: error" + error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { contactValidatorMiddleware };