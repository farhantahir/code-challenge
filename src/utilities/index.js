const utilities = {};

[
  'sort'
].forEach(m => {
  utilities[m] = require(`./${m}`);
});

module.exports = utilities;