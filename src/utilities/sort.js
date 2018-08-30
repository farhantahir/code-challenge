
/**
 * Sorts array of objects based string field
 * @param {array} records 
 * @param {string} field
 * @param {string} order asc or desc
 * @returns {array}
 */
function strSort(records, field, order) {
  const sortedRecords = records.sort((a, b) => a[field].localeCompare(b[field]));
  if (order === 'desc') sortedRecords.reverse();
  return sortedRecords;
}

/**
 * Asc Sorts array of objects based number type field
 * @param {array} records 
 * @param {string} field
 * @param {string} order asc or desc
 * @returns {array}
 */
function numSort(records, field, order) {
  const sortedRecords = records.sort((a, b) => parseFloat(a[field]) - parseFloat(b[field]));
  if (order === 'desc') sortedRecords.reverse();
  return sortedRecords;
}

module.exports = {
  strSort,
  numSort
};