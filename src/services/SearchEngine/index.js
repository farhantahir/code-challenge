const Field = require('./Field');
const FIELD_TYPES = require('./fieldTypes');
const COM_OPTS = require('./com_opts');
const { sort } = require('../../utilities');
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
    this.sortFields = [];
    this.fieldTypes = FIELD_TYPES;
    this.sortOrders = {
      asc: 'asc',
      desc: 'desc'
    };
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
    return this.fields;
  }

  /**
   * sets sort fields for Search Engine
   * @param {array} fields Array of sort fieds
   */
  setSortFields(fields = []) {
    this.sortFields = fields;
    return this.sortFields;
  }

  /**
   * Add Data to Search Engine
   * @param {array} data
   */
  addData(records) {
    this.records = records;
    return this.records;
  }

  /**
   * Searches records by processing them through filterRecord method 
   * @param {object} filters { fieldName: { opt: 'opt', val } }
   * @param {object} sort { fieldName: 'asc' or 'desc' }
   * @returns {array} Array of filtered records
   */
  search(filters, sort) {
    const filteredRecords = this.records.filter(this.filterRecord(filters));
    return this.applySort(filteredRecords, sort);
  }

  /**
   * Checks if record mathces with provided filters
   * @param {object} filters 
   */
  filterRecord(filters) {
    const fields = this.fields;
    return (record) => {
      let isMatch = true;
      for (let field of Object.keys(filters)) {
        /**
         * If field is not defined already 
         * or 
         * It is not a Field object don't apply filters
         */
        if (!fields[field] || !fields[field] instanceof Field) continue;

        let match = true;

        /**
         * If field type is STRING or NUMBER simply run applyFilter on value and field
         */
        if (
          fields[field].type === this.fieldTypes.STRING
          || fields[field].type === this.fieldTypes.NUMBER
        ) {
          match = this.applyFilters(field, filters, record);
        }

        /**
         * If filed type is ARRAY_OF_OBJECTS
         * Then filter format is as follow.
         * availability: {
         *  from: {
         *    opt: OPTS.eq,
         *    val: '20-10-2019'
         *  },
         *  to:{
         *    opt: OPTS.eq,
         *    val: '20-12-2019'
         *  }
         * }
         * 
         * Get nested filds array using Object.keys iterate through each filterKey
         * get nested record that is array of objects
         * Run each record through applyFilter
         * break if nestedMatch is true
         * TODO: As breaking the loop if one record found, this should be a config on filter object
         * like match: single or multi
         */
        if (fields[field].type === this.fieldTypes.ARRAY_OF_OBJECTS) {
          const nestedFilters = filters[field];
          const nestedRecords = record[field];
          const nestedMatch = nestedRecords.find((nestedRecord) => {
            let isNestedMatch = true;
            for (let nestedField of Object.keys(nestedFilters)) {
              const nestedMatch = this.applyFilters(nestedField, nestedFilters, nestedRecord);
              if (!nestedMatch) {
                isNestedMatch = false;
                break;
              }
            }
            return isNestedMatch;
          });

          /**
           * If one match is found on nested objects set match = true
           */
          if (!nestedMatch)
            match = false;

        }

        if (match)
          continue;
        else {
          isMatch = false;
          break;
        }

      }
      return isMatch;
    };
  }

  /**
   * Applies provided filters on a given field and record.
   * @param {string} field
   * @param {object} filters
   * @param {object} record
   */
  applyFilters(field, filters, record) {
    /**
     * Assumption:
     * If any of the following filter mathces set isMatch = true and  return
     */
    const OPTS = this.OPTS;
    const { opt, val } = filters[field];
    let match = false;

    /**
     * If filter operator is set to eq
     */
    if (opt === OPTS.eq && COM_OPTS.eq(val, record[field]))
      match = true;

    /**
     * If filter operator is set to gt
     */
    if (opt === OPTS.gt && COM_OPTS.gt(record[field], val))
      match = true;

    /**
     * If filter operator is set to lt
     */
    if (opt === OPTS.lt && COM_OPTS.lt(record[field], val))
      match = true;

    /**
     * If filter operator is set to btw
     */
    if (opt === OPTS.btw && COM_OPTS.btw(record[field], val[0], val[1]))
      match = true;

    /**
     * If filter operator is set to btwe
     */
    if (opt === OPTS.btwe && COM_OPTS.btwe(record[field], val[0], val[1]))
      match = true;

    /**
     * If filter operator is set to regex
     */
    if (
      opt === OPTS.regex
      && COM_OPTS.regex(record[field].toLowerCase(), val.toLowerCase())
    ) {
      match = true;
    }

    return match;
  }

  /**
   * Sorts Data
   * @param {array} records 
   * @param {object} sortObj 
   */
  applySort(records, sortObj) {
    const { field, order } = sortObj;
    /**
     * sort field is not one of the set sort fields
     * return records without any sort being applied
     */
    if (this.sortFields.indexOf(field) === -1) return records;

    /**
     * Default sort order is asc
     */
    const sortOrder = this.sortOrders[order] || this.sortOrders.ASC;
    if (this.fields[field].type === this.fieldTypes.STRING)
      return sort.strSort(records, field, sortOrder);

    if (this.fields[field].type === this.fieldTypes.NUMBER)
      return sort.numSort(records, field, sortOrder);
  }
}

module.exports = SearchEngine;