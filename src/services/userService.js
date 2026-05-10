const userRepository = require('../repositories/userRepository');

const userService = {
  async addUser({ name, email, password, role }) {
    const userId = await userRepository.addUser({ name, email, password, role });
    return userId;
  },

  async getUserById(id) {
    const user = await userRepository.getUserById(id);
    return user;
  },
};

module.exports = userService;
