const errors = require("../content/errors.json");

const Errors = function Errors() {
};

Errors.prototype.articleNotFoundError = (req, res, payload, cb) => cb(errors.article_not_found, null);

Errors.prototype.pageNotFoundError = (req, res, payload, cb) => cb(errors.not_found, null);

Errors.prototype.requestInvalidError = (req, res, payload, cb) => cb(errors.request_invalid, null);

exports.Errors = Errors;
