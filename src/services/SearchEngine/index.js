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
    this.fields = this.createFields(fields);
    return this.fields;
  }

  /**
   * Creates Field objects using static createFields method of Field class
   * @param {object} fields
   * @returns {array}
   */
  createFields(fields) {
    return Field.createFields(fields);
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
    const { STRING, NUMBER, ARRAY_OF_OBJECTS } = this.fieldTypes;

    return (record) => {
      let isMatch = true;
      for (let filterKey of Object.keys(filters)) {
        if (!fields[filterKey] || !fields[filterKey] instanceof Field) continue;
        let match = true;
        const field = fields[filterKey];
        const filter = filters[field];

        if (field.type === STRING || field.type === NUMBER) {
          match = this.applyFilters(field, filter, record);
        }
        
        if (field.type === ARRAY_OF_OBJECTS) {
          const records = record[field];
          match = records.find(
            rec => {
              for (let nestedFilterKey of Object.keys(filter)) {
                const nestedFilter = filter[nestedFilterKey];
                const nestedMatch = this.applyFilters(nestedFilterKey, nestedFilter, rec);
                if (nestedMatch) return true;
              }
              return false;
            }
          );
        }

        if (match) continue;
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
   * @param {object} filter
   * @param {object} record
   */
  applyFilters(field, filter, record) {
    const OPTS = this.OPTS;
    const { opt, val } = filter;
    let match = false;

    if (opt === OPTS.eq && COM_OPTS.eq(val, record[field]))
      match = true;

    if (opt === OPTS.gt && COM_OPTS.gt(record[field], val))
      match = true;

    if (opt === OPTS.lt && COM_OPTS.lt(record[field], val))
      match = true;

    if (opt === OPTS.btw && COM_OPTS.btw(record[field], val[0], val[1]))
      match = true;

    if (opt === OPTS.btwe && COM_OPTS.btwe(record[field], val[0], val[1]))
      match = true;

    if (opt === OPTS.regex && COM_OPTS.regex(record[field], val))
      match = true;

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