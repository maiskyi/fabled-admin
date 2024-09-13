export enum StoryStatus {
  Initialized = "initialized",
  ContentInProgress = "contentInProgress",
  ImageInProgress = "imageInProgress",
  Success = "success",
}

export enum StoryExceptionCode {
  CreateStoryRequestFailed = "createStoryRequestFailed",
  StoryContentGenerationFailed = "storyContentGenerationFailed",
  StoryContentGenerationFailedWithNoResult = "storyContentGenerationFailedWithNoResult",
  StoryGenerationFailed = "storyGenerationFailed",
  StoryImageGenerationFailed = "storyImageGenerationFailed",
  StoryImageGenerationFailedWithNoResult = "storyImageGenerationFailedWithNoResult",
  StoryImageUploadingToCloudinaryFailed = "storyImageUploadingToCloudinaryFailed",
}

export enum StoryReadTime {
  Min5 = 5,
  Min7 = 7,
  Min10 = 10,
}
