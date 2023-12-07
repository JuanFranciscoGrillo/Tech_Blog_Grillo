// utils/helpers.js

module.exports = {
  // Retain your existing helpers
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  // Define the errorResponse function
  errorResponse: (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  },
};
