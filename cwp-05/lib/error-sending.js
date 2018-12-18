const errors = require("../content/errors.json");

exports.articleNotFoundError = (req, res, payload, cb) => cb(errors.article_not_found, null);

exports.pageNotFoundError = (req, res, payload, cb) => cb(errors.not_found, null);

exports.requestInvalidError = (req, res, payload, cb) => cb(errors.request_invalid, null);
