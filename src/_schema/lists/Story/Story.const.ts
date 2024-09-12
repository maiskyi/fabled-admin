import { StoryReadTime, StoryStatus } from "./Story.types";

export const READ_TIME_OPTIONS = [
  {
    label: "5 min",
    value: StoryReadTime.Min5,
  },
  {
    label: "7 min",
    value: StoryReadTime.Min7,
  },
  {
    label: "10 min",
    value: StoryReadTime.Min10,
  },
];

export const STATUS_OPTIONS = [
  {
    label: "Initialized",
    value: StoryStatus.Initialized,
  },
  {
    label: "Content in progress",
    value: StoryStatus.ContentInProgress,
  },
  {
    label: "Image in progress",
    value: StoryStatus.ImageInProgress,
  },
  {
    label: "Success",
    value: StoryStatus.Success,
  },
];
