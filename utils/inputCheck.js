/**
 * Checks if the required fields are present in the data object.
 * @param {object} data - The data object to check.
 * @param {...string} requiredFields - The required fields.
 * @return {string|null} - Returns a string with the missing fields or null if all fields are present.
 */
function inputCheck(data, ...requiredFields) {
  const missingFields = requiredFields.filter(
    (field) => !data.hasOwnProperty(field)
  );

  if (missingFields.length) {
    return `Missing fields: ${missingFields.join(', ')}`;
  }

  return null;
}

module.exports = inputCheck;
