const InvariantError = require('../utils/InvariantError');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    throw new InvariantError(message);
  }

  next();
};

module.exports = validate;
