// utils/helpers.js
module.exports = {
  // Retain your existing helpers
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  // Add the extend helper
  extend: function (name, context) {
    if (!this._blocks) {
      this._blocks = {};
    }
    const blocks = this._blocks;
    const block = blocks[name] || (blocks[name] = []);

    block.push(context.fn(this)); // Push the block content for later use
  },

  // Add the content helper
  content: function (name) {
    const blocks = this._blocks || {};
    const block = blocks[name] || [];
    return block.join('\n');
  },
};
