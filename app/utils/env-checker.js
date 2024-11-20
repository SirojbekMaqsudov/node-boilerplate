function envChecker() {
  if (
    !process.env.DB_NAME ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_HOST ||
    !process.env.JWT_ACCESS_SECRET ||
    !process.env.JWT_REFRESH_SECRET ||
    !process.env.JWT_ACCESS_EXPIRATION ||
    !process.env.JWT_REFRESH_EXPIRATION ||
    !process.env.BCRYPT_SALT_ROUNDS ||
    !process.env.SECRET_KEY
  ) {
    console.error("the all env variables can't load on runtime!");
    process.exit(1);
  }
}

module.exports = {
  envChecker
};