const argon2 = require("argon2");

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

async function verifyPassword(hashedPassword, plainTextPassword) {
  try {
    if (await argon2.verify(hashedPassword, plainTextPassword)) {
      console.log("Passwords match!");
      return true;
    } else {
      console.log("Passwords do not match.");
      return false;
    }
  } catch (err) {
    console.error("Error verifying password:", err);
  }
}

module.exports = { hashPassword, verifyPassword };
