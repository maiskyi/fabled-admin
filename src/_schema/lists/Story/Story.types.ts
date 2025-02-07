export enum StoryStatusLog {
  Initialized = "initialized",
  ContentInProgress = "contentInProgress",
  ImageInProgress = "imageInProgress",
  Success = "success",
}

export enum StoryStatus {
  InProgress = "inprogress",
  Success = "success",
  Failed = "failed",
}

export enum StoryExceptionCode {
  CreateStoryRequestFailed = "createStoryRequestFailed",
  StoryContentGenerationFailed = "storyContentGenerationFailed",
  StoryContentGenerationFailedWithNoResult = "storyContentGenerationFailedWithNoResult",
  StoryGenerationFailed = "storyGenerationFailed",
  StoryImageGenerationFailed = "storyImageGenerationFailed",
  StoryImageUploadFailed = "storyImageUploadFailed",
  StoryImageGenerationFailedWithNoResult = "storyImageGenerationFailedWithNoResult",
  StoryImageUploadingToCloudinaryFailed = "storyImageUploadingToCloudinaryFailed",
}

export enum StoryReadTime {
  Min5 = 5,
  Min7 = 7,
  Min10 = 10,
}

export enum ChildGender {
  Boy = "boy",
  Girl = "girl",
}
