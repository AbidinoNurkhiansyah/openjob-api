/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('applications', {
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('applications', 'created_at');
};
