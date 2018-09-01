const FIELD_TYPES = require('./fieldTypes');

/**
 * Field Class
 */
class Field {
  /**
   * @constructor
   * @param {string} name The name of the field
   * @param {string} type The type of the field from supported types
   * @param {string} mapKey Key that maps on document object.      
   * @param {boolean} multiValue To determine if field is array or not
   */
  constructor(name, type, multiValue = false) {
    this.name = name;
    this.type = FIELD_TYPES[type] || FIELD_TYPES.STRING;    
    this.multiValue = multiValue;
  }

  /**
   * Creates Field objects
   * @param {object} fields 
   * @returns {array}
   */
  static createFields(fields) {
    return Object.keys(fields).reduce((obj, fieldName) => {
      const { type, multiValue } = fields[fieldName];
      obj[fieldName] = new this(fieldName, type, multiValue);
      return obj;
    }, {});
  }

  /**
   * String representation of the IndexField
   */
  toString() {
    return this.name;
  }
}

module.exports = Field;