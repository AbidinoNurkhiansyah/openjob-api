/* eslint-disable camelcase */

exports.up = (pgm) => {
  // Add created_at to companies
  pgm.addColumn('companies', {
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });

  // Add description and created_at to categories
  pgm.addColumn('categories', {
    description: {
      type: 'TEXT',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });

  // Add created_at to bookmarks
  pgm.addColumn('bookmarks', {
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('bookmarks', 'created_at');
  pgm.dropColumn('categories', ['description', 'created_at']);
  pgm.dropColumn('companies', 'created_at');
};
