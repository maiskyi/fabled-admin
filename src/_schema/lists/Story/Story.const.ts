import {
  StoryReadTime,
  StoryStatusLog,
  StoryExceptionCode,
  StoryStatus,
  ChildGender,
} from "./Story.types";

export const CHILD_GENDER_OPTIONS = [
  {
    label: "Boy",
    value: ChildGender.Boy,
  },
  {
    label: "Girl",
    value: ChildGender.Girl,
  },
];

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
    label: "In progress",
    value: StoryStatus.InProgress,
  },
  {
    label: "Success",
    value: StoryStatus.Success,
  },
  {
    label: "Failed",
    value: StoryStatus.Failed,
  },
];

export const STATUS_LOG_OPTIONS = [
  {
    label: "Initialized",
    value: StoryStatusLog.Initialized,
  },
  {
    label: "Content in progress",
    value: StoryStatusLog.ContentInProgress,
  },
  {
    label: "Image in progress",
    value: StoryStatusLog.ImageInProgress,
  },
  {
    label: "Success",
    value: StoryStatusLog.Success,
  },
  {
    label: "Create Story Request Failed",
    value: StoryExceptionCode.CreateStoryRequestFailed,
  },
  {
    label: "Story Content Generation Failed",
    value: StoryExceptionCode.StoryContentGenerationFailed,
  },
  {
    label: "Story Content Generation Failed With No Result",
    value: StoryExceptionCode.StoryContentGenerationFailedWithNoResult,
  },
  {
    label: "Story Generation Failed",
    value: StoryExceptionCode.StoryGenerationFailed,
  },
  {
    label: "Story Image Generation Failed",
    value: StoryExceptionCode.StoryImageGenerationFailed,
  },
  {
    label: "Story Image Generation Failed With No Result",
    value: StoryExceptionCode.StoryImageGenerationFailedWithNoResult,
  },
  {
    label: "Story Image Upload Failed",
    value: StoryExceptionCode.StoryImageUploadFailed,
  },
  {
    label: "Story Image Uploading To Cloudinary Failed",
    value: StoryExceptionCode.StoryImageUploadingToCloudinaryFailed,
  },
];
