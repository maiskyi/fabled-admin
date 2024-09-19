// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryStatusType } from ".keystone/types";

/**
 * Description placeholder
 *
 * @export
 * @class Status
 * @typedef {Status}
 */
export class StoryStatus {
  public value: StoryStatusType[] = [];

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
  public next = (v: StoryStatusType) => {
    this.value = [...this.value, v];
    return this;
  };
}
