const usersJSON = require('../db/users.json');

module.exports = {
  findUserByEmail: function (email) {
    return usersJSON.find((u) => u.email === email);
  },
  validateUserPassword: function (email, password) {
    const user = this.findUserByEmail(email);

    if (!user) {
      throw new Error('User not exist');
    }

    if (user.password === password) {
      const res = Object.assign({}, user);
      delete res.password;

      return user;
    }

    return false;
  }
}
