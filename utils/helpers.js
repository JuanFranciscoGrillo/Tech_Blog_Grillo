module.exports = {
  // Formats a date to MM/DD/YYYY
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  // Initialize a 'blocks' object for storing blocks content
  initBlocks: function () {
    this._blocks = {};
  },

  // Define the 'extend' helper to specify the layout template
  extend: function (layoutName, options) {
    this._layoutFile = layoutName;
    this.initBlocks(); // Initialize blocks for the layout
    return options.fn(this); // Execute the template within the layout context
  },

  // Define the 'content' helper to store content for a specific block
  content: function (blockName, options) {
    this._blocks[blockName] = options.fn(this);
  },

  // Define a helper to retrieve the content of a block
  block: function (blockName) {
    return this._blocks[blockName] || '';
  }
};
