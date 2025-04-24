export default () => ({
  mongoUri: process.env.MONGO_URI,
  jwt: {
    Secret: process.env.JWT_SECRET,
    expiresIn: 60,
  },
});
