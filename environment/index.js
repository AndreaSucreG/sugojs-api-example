let env = require("./localhost");

if (process.env.NODE_ENV === "development") {
  env = Object.assign(env, require("./development"));
} else if (process.env.NODE_ENV === "development") {
  env = Object.assign(env, require("./development"));
} else if (process.env.NODE_ENV === "testing") {
  env = Object.assign(env, require("./testing"));
} else if (process.env.NODE_ENV === "production") {
  env = Object.assign(env, require("./production"));
}

module.exports = env;
