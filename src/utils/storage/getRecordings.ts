import { keys, get, getMany } from "idb-keyval";
import { RECORDING_POSTFIX, videoOptions } from "../constants";
import { Session } from "../session";

const isRecordingRegex = new RegExp(RECORDING_POSTFIX + "$");
export function getRecordings(): Promise<Session[]> {
  return new Promise((resolve, reject) => {
    keys()
      .then((keys) => {
        const sessionKeys = keys.filter(
          (key) => !isRecordingRegex.test(key.toString())
        );

        getMany(sessionKeys)
          .then((sessionsData) => {
            resolve(
              sessionsData.map((sessionData) => new Session(sessionData))
            );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

export function getSession(id: IDBValidKey | string): Promise<Session> {
  return new Promise((resolve, reject) => {
    get(id)
      .then((session) => {
        resolve(new Session(session));
      })
      .catch((e) => reject(e));
  });
}

export function getRecording(
  id: IDBValidKey | string,
  type: string = videoOptions.mimeType
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    get(id)
      .then((recording) => {
        resolve(new Blob([recording], { type }));
      })
      .catch((e) => reject(e));
  });
}
