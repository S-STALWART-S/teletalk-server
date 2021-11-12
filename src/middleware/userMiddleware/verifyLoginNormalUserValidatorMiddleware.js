const {
	verifyLoginNormalUserValidator,
} = require("~/validator/userValidator/verifyLoginNormalUserValidator");

const verifyLoginNormalUserValidatorMiddleware = async (req, res, next) => {
	try {
		const { cellphone, verificationCode } = req.body;

		const verified = await verifyLoginNormalUserValidator({
			cellphone,
			verificationCode,
    });
    if (verified !== true) {
    throw }
	} catch (error) {
	} finally {
		next();
	}
};

module.exports = { verifyLoginNormalUserValidatorMiddleware };