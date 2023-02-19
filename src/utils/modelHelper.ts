import * as tf from '@tensorflow/tfjs-core';
import {createDetector, movenet, PoseDetector, SupportedModels} from "./pose-detection";
import {STATE} from "./pose-detection/params";

export async function initializeModel(): Promise<PoseDetector> {
  return createDetector(SupportedModels.MoveNet, {modelType: movenet.modelType.SINGLEPOSE_THUNDER});
}

export async function setBackendAndEnvFlags(flagConfig: typeof STATE['flags'], backend: SupportedModels) {
  tf.env().setFlags(flagConfig);

  const [runtime, backendName] = backend.split('-');

  if (runtime === 'tfjs') {
    const ENGINE = tf.engine();
    if (!(backendName in ENGINE.registryFactory)) {
      throw new Error(`${backendName} backend is not registered.`);
    }
    if (backendName in ENGINE.registry) {
      const backendFactory = tf.findBackendFactory(backendName);
      tf.removeBackend(backendName);
      tf.registerBackend(backendName, backendFactory);
    }

    await tf.setBackend(backendName);
  }
}