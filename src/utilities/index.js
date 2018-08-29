const utilities = {};

[
  
].forEach(m => {
  utilities[m] = require(`./${m}`);
});

module.exports = utilities;