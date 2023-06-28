import { Logger } from '@nestjs/common';
import type { Server } from 'node:http';

export function gracefulShutdown(
    server: Server,
    code: string,
): (event: string) => void {
    const logger: Logger = new Logger(gracefulShutdown.name);
    return (event: string): void => {
        logger.verbose(`${event} signal received with code ${code}`);
        logger.log('Closing http server...');
        server.close(() => {
            logger.log('Http server closed.');
            process.exit(0);
        });
    };
}
export default gracefulShutdown;
