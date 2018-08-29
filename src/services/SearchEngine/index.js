const Field = require('./Field');
const FIELD_TYPES = require('./fieldTypes');
const COM_OPTS = require('./com_opts');
/**
 * Class for SearchEngine Service
 */
class SearchEngine {

  /**
   * @constructor
   * @property {array} records Array of objects
   * @property {object} fields Object of fields name:Field object
   * @property {object} fieldTypes Supported Field Types
   * @property {object} OPTS Comparison operators
   */
  constructor() {
    this.records = [];
    this.fields = {};
    this.fieldTypes = FIELD_TYPES;
    this.OPTS = Object.keys(COM_OPTS).reduce((opts, opt) => {
      opts[opt] = opt;
      return opts;
    }, {});
  }

  /**
   * Sets fields on Search Engine
   * @param {object} fields Object of fields { fieldName:{} }  object
   */
  setFields(fields = {}) {
    this.fields = Object.keys(fields).reduce((obj, fieldName) => {
      const { type, multiValue } = fields[fieldName];
      obj[fieldName] = new Field(fieldName, type, multiValue);
      return obj;
    }, {});
  }

  /**
   * Add Data to Search Engine
   * @param {array} data
   */
  addData(records) {
    return this.records = records;
  }

  /**
   * Searches records by processing them through filterRecord method 
   * @param {object} filters { fieldName: { opt: 'opt', val } }
   * @returns {array} Array of filtered records
   */
  search(filters) {
    return this.records.filter(this.filterRecord(filters));
  }

  /**
   * Checks if record mathces with provided filters
   * @param {object} filters 
   */
  filterRecord(filters) {
    const OPTS = this.OPTS;
    return function (record) {
      let isMatch = true;
      for (let field of Object.keys(filters)) {
        const { opt, val } = filters[field];

        /**
         * Assumption:
         * If any of the following filter mathces set isMatch = true and  return
         */

        /**
         * If filter operator is set to eq
         */
        if (opt === OPTS.eq) {
          if (COM_OPTS.eq(val, record[field])) continue;
          isMatch = false;
          break;
        }


        /**
         * If filter operator is set to gt
         */
        if (opt === OPTS.gt) {
          if (COM_OPTS.gt(record[field], val)) continue;
          isMatch = false;
          break;
        }

        /**
         * If filter operator is set to lt
         */
        if (opt === OPTS.lt) {
          if (COM_OPTS.lt(record[field], val)) continue;
          isMatch = false;
          break;
        }



        /**
         * If filter operator is set to btw
         */
        if (opt === OPTS.btw) {
          if (COM_OPTS.btw(record[field], val[0], val[1])) continue;
          isMatch = false;
          break;
        }


        /**
         * If filter operator is set to btwe
         */
        if (opt === OPTS.btwe) {
          if (COM_OPTS.btwe(record[field], val[0], val[1])) continue;
          isMatch = false;
          break;
        }


        /**
         * If filter operator is set to regex
         */
        if (opt === OPTS.regex) {
          if (COM_OPTS.regex(record[field], val)) continue;
          isMatch = false;
          break;
        }
      }

      return isMatch;
    };
  }
}

module.exports = SearchEngine;