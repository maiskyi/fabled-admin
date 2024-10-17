import { createLogger, Logger as WinstonLogger, transports } from "winston";
import { init } from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import SentryTransport from "winston-transport-sentry-node";
import { LoggerInitParams } from "./Logger.types";

const { Console } = transports;

/**
 * Description placeholder
 *
 * @export
 * @class Logger
 * @typedef {Logger}
 */
export class Logger {
  /**
   * Description placeholder
   *
   * @private
   * @static
   * @type {WinstonLogger}
   */
  private static logger: WinstonLogger;

  /**
   * Description placeholder
   *
   * @param {LoggerInitParams} param0
   * @param {LoggerInitParams} param0.dsn
   */
  public static init = ({ dsn, environment }: LoggerInitParams) => {
    init({
      dsn,
      environment,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
    this.logger = createLogger({
      level: "info",
      transports: [
        new SentryTransport({
          sentry: {
            dsn,
            environment,
          },
          level: "error",
        }),
        new Console(),
      ],
    });
  };

  /**
   * Description placeholder
   *
   * @param {string} message
   * @param {...unknown[]} meta
   */
  public static error = (message: string, ...meta: unknown[]) => {
    this.logger.error(message, ...meta);
  };

  /**
   * Description placeholder
   *
   * @param {string} message
   * @param {...unknown[]} meta
   */
  public static info = (message: string, ...meta: unknown[]) => {
    this.logger.info(message, ...meta);
  };
}
