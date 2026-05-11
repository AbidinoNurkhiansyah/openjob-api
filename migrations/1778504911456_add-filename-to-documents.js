/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('documents', {
    original_filename: {
      type: 'VARCHAR(255)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('documents', 'original_filename');
};
