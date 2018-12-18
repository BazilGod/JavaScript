const fs = require("fs");
const [filePath, X] = process.argv.slice(2);

setInterval(function() {
  fs.appendFile(filePath, getRandomArbitrary(0, 1000000) + "\r\n", err => {
    if (err) console.log(err);
  });
}, X * 1000);

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
