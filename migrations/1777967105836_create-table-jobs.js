/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'companies(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
    job_type: {
      type: 'VARCHAR(50)',
    },
    experience_level: {
      type: 'VARCHAR(50)',
    },
    location_type: {
      type: 'VARCHAR(50)',
    },
    location_city: {
      type: 'VARCHAR(255)',
    },
    salary_min: {
      type: 'BIGINT',
    },
    salary_max: {
      type: 'BIGINT',
    },
    is_salary_visible: {
      type: 'BOOLEAN',
      default: false,
    },
    status: {
      type: 'VARCHAR(20)',
      default: pgm.func("'open'"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
};
