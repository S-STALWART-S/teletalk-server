const ENVIRONMENT_KEYS = {
  JWT_MAIN_SECRET: "JWT_MAIN_SECRET",
  JWT_SIGN_IN_SECRET: "JWT_SIGN_IN_SECRET",
  LOCAL_PORT: "LOCAL_PORT",
  MONGO_URI_ATLAS: "MONGO_URI_ATLAS",
  MONGO_URI_LOCAL: "MONGO_URI_LOCAL",
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  SMS_CLIENT_PASSWORD: "SMS_CLIENT_PASSWORD",
  SMS_CLIENT_USERNAME: "SMS_CLIENT_USERNAME",
  TEST_MAIN_TOKEN: "TEST_MAIN_TOKEN",
  TEST_VERIFY_TOKEN: "TEST_VERIFY_TOKEN",
};

const ENVIRONMENT_VALUES = {
  NODE_ENV: {
    test: "test",
    production: "production",
    development: "development",
  },
};

module.exports = { ENVIRONMENT_KEYS, ENVIRONMENT_VALUES };