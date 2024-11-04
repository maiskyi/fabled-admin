// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryStatusLogType } from ".keystone/types";

/**
 * Description placeholder
 *
 * @export
 * @class Status
 * @typedef {Status}
 */
export class StoryStatusLog {
  public value: StoryStatusLogType[] = [];

  /**
   * Creates an instance of Status.
   *
   * @constructor
   */
  constructor() {
    this.value = ["initialized"];
  }

  /**
   * Description placeholder
   *
   * @param {DTO.FableStatus} v
   * @return {this}
   */
  public next = (v: StoryStatusLogType) => {
    this.value = [...this.value, v];
    return this;
  };
}
