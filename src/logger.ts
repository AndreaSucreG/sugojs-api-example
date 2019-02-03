import { Logger, ConsoleLoggerPlugIn } from '@sugo/logger'

export default new Logger().addPlugin(new ConsoleLoggerPlugIn());
