/**
 * Comparison operators with key/function mappings
 */
const COM_OPTS = {
  'eq': (a, b) => a == b,
  'gt': (a, b) => a > b,
  'lt': (a, b) => a < b,
  'btw': (a, v1, v2) => a > v1 && a < v2,
  'btwe': (a, v1, v2) => a >= v1 && a <= v2,
  'regex': (a, b) => a.includes(b) // Need to make it better
};

module.exports = COM_OPTS;