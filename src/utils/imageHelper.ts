export async function extractFrameFromRecording(
  recording: Blob,
  frameTime: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const videoUrl = URL.createObjectURL(recording);
      const videoElement = document.createElement("video");
      videoElement.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }

        videoElement.currentTime = frameTime;

        const render = () => {
          ctx.drawImage(videoElement, 0, 0, width, height);
          const imageDataURL = canvas.toDataURL();
          resolve(imageDataURL);

          videoElement.removeEventListener("timeupdate", render);
        };
        videoElement.addEventListener("timeupdate", render);
      });
      videoElement.src = videoUrl;
      videoElement.load();
    } catch (e) {
      reject(e);
    }
  });
}
