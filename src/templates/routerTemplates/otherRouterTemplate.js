const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/other", "1.0.0");

const welcome = routeTemplateGenerator(
	"get",
	"/welcome",
	"1.0.0",
	"Use to get welcome message for client",
);

const error = routeTemplateGenerator(
	"get",
	"/error",
	"1.0.0",
	"Use for get all errors messages",
);

const otherRouterTemplate = {
	baseUrl,
	error,
	version: "1.0.0",
	welcome,
};

module.exports = { otherRouterTemplate };