const { myConsole } = require("~/function/utility/myConsole");

const errorResponser = ({ req, res, next, statusCode }) => {
	try {
		const {
			categorizedLength,
			uncategorizedLength,
			categorized,
			uncategorized,
			statusCode: statusCodeFromCollector,
		} = res.errors;
		if (categorizedLength || uncategorizedLength) {
			myConsole.redBright(statusCode, "red").log();

			const code = statusCode || statusCodeFromCollector || 400;

			res.status(code).json({ errors: { categorized, uncategorized, code } });
		} else {
			next();
		}
	} catch (error) {
		myConsole.redBright("BAD ERROR!!!").log();
	}
};

module.exports = { errorResponser };
