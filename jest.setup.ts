import winston from 'winston';

winston.remove(winston.transports.Console);
winston.remove(winston.transports.File);
