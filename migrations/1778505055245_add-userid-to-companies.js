/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('companies', {
    user_id: {
      type: 'VARCHAR(50)',
      notNull: false, // Set false agar data lama tidak error, tapi controller akan selalu mengisi field ini untuk data baru
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('companies', 'user_id');
};
