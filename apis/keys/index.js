const fs = require("fs");

module.exports = {
  key: fs.readFileSync(`${__dirname}/private.key`),
  keyPub: fs.readFileSync(`${__dirname}/public.key`),
};