const DEFAULT_IMAGE_RANDOM_URLS = [
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/4491829/pexels-photo-4491829.jpeg",
  "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg",
  "https://images.pexels.com/photos/4458210/pexels-photo-4458210.jpeg",
  "https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg",
];

export const generateImageRandom = (): string => {
  const randomNum = Math.floor(Math.random() * 10000);
  return DEFAULT_IMAGE_RANDOM_URLS[
    randomNum % DEFAULT_IMAGE_RANDOM_URLS.length
  ];
};
