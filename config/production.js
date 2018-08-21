/**
 * Production environment config
 */

const logger = require('morgan');

module.exports = {
  Fork_Children: false,
  logger: logger([
    '[:date[clf]]',
    ':url',
    ':method',
    ':status',
    ':res[content-length]',
    ':remote-addr',
    '":referrer"',
    '":user-agent"'
  ].join(' '))
};