let films = require("../top2501.json");
const fs = require('fs');

let compareField = "position";
let compareOrder = "asc";

function compareCustom(a, b) {
	if (a[compareField] > b[compareField])
	{
		return compareOrder === "asc" ? 1 : -1;
	}
	if (a[compareField] < b[compareField])
	{
		return compareOrder === "asc" ? -1 : 1;
	}
}

module.exports.readAll = function(req, res, cb) {
	films.sort(compareCustom);
//	fs.writeFile("top250.json", JSON.stringify(films), "utf8", () => {});
	cb(null, films);
};