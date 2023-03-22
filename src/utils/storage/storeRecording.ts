import { setMany } from "idb-keyval";
import {RECORDING_POSTFIX, videoOptions} from "../constants";
import { Session } from "../session";

export function storeRecording(
    newRecordingSession: Session,
  chunks: Blob[],
  type: string = videoOptions.mimeType
): Promise<string> {
  return new Promise((resolve, reject) => {
    const id = `session-${newRecordingSession.timestamp}`;

    const blob = new Blob(chunks, { type });

    blob
      .arrayBuffer()
      .then((buffer) => {
        const video = document.createElement("video");
        video.addEventListener("loadedmetadata", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return;
          }

          const frameTime = 0.1;
          let frameIdx = 0;

          if (video.duration && isFinite(video.duration)) {
            frameIdx = Math.round(frameTime * video.duration * 30);
          }
          video.currentTime = frameIdx / 30;

          const render = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL();
            newRecordingSession.setImageData(imageDataURL);

            setMany([
              [`${id}${RECORDING_POSTFIX}`, buffer],
              [`${id}`, newRecordingSession.export()],
            ])
              .then(() => resolve(id))
              .catch((e) => reject(e));
            video.removeEventListener("timeupdate", render);
          };
          video.addEventListener("timeupdate", render);
        });
        video.src = URL.createObjectURL(blob);
        video.load();
      })
      .catch((e: Error) => {
        console.error(e);
        reject(e);
      });
  });
}
