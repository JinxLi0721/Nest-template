import { Injectable, ConsoleLogger } from '@nestjs/common';
//create file
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }).format(new Date())}\t${entry}\n`;
    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }
  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
