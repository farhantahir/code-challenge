const Field = require('./Field');
const FIELD_TYPES = require('./fieldTypes');
/**
 * Class for SearchEngine Service
 */
class SearchEngine {

  /**
   * @constructor
   * @property {array} records Array of objects
   * @property {object} fields Object of fields name:Field object
   */
  constructor() {
    this.records = [];
    this.fields = {};
    this.fieldTypes = FIELD_TYPES;
  }

  /**
   * Sets fields on Search Engine
   * @param {object} fields Object of fields { fieldName:{} }  object
   */
  setFields(fields = {}) {
    this.fields = Object.keys(fields).reduce((obj, fieldName) => {
      const { type, mapKey, multiValue } = fields[fieldName];
      obj[fieldName] = new Field(fieldName, type, mapKey, multiValue);
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

}

module.exports = SearchEngine;