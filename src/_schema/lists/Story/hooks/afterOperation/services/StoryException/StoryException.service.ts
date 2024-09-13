import { isUndefined, omitBy } from "lodash";
import { StoryExceptionCode } from "../../../../Story.types";
import { ExceptionParams } from "./StoryException.types";

/**
 * Description placeholder
 *
 * @export
 * @class Exception
 * @typedef {Exception}
 * @extends {Error}
 */
export class StoryException extends Error {
  /**
   * Description placeholder
   *
   * @public
   * @type {ExceptionCode}
   */
  public code: StoryExceptionCode;

  /**
   * Description placeholder
   *
   * @public
   * @type {?string}
   */
  public reason?: string;

  /**
   * Creates an instance of Exception.
   *
   * @constructor
   * @param {ExceptionParams} param0
   * @param {ExceptionParams} param0.message
   * @param {ExceptionParams} param0.code
   */
  constructor({ message, code, reason }: ExceptionParams) {
    super(message);
    this.code = code;
    this.reason = reason;
  }

  public toObject = () =>
    omitBy(
      {
        reason: this.reason,
        code: this.code,
        message: this.message,
      },
      isUndefined
    );
}
