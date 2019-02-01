const { Logger } = require("@sugo/logger");
const { ConsoleLoggerPlugIn } = require("@sugo/logger/plugins/console");

module.exports = new Logger().addPlugin(new ConsoleLoggerPlugIn());
