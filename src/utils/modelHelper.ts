import * as ort from "onnxruntime-web";
import {InferenceSession} from "onnxruntime-web";

export async function initializeModel(): Promise<InferenceSession> {
  console.log(ort)
  const model = await ort.InferenceSession.create("./hrnet512.onnx");

  return model;
}
