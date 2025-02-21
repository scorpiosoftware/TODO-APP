const bcrypt = require('bcrypt');

class PasswordHash {
  async hash(plainPassword, saltRounds = 10) {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return  hashedPassword;
    } catch (error) {
       console.error('Error hashing password:', error);
      throw error;
    }
  }
  async compare(plainPassword, hash) {
    try {
      // This returns true if the plainPassword corresponds to the hash
      return await bcrypt.compare(plainPassword, hash);
    } catch (error) {
      console.error('Error comparing password:', error);
      throw error;
    }
  }
}
module.exports = new PasswordHash;
