const ConsoleLogger = require('./console-logger');
const FileLogger = require('./file-logger');
const DeferredFileLogger = require('./deferred-file-logger');

(new ConsoleLogger('test prefix', 'INFO')).log('Hi ConsoleLogger!!!');
(new FileLogger('out_log.txt', 'test prefix', 'WARN')).log('Hi FileLogger!!!');
(new DeferredFileLogger()).log('Hi DeferredFileLogger!!!');

