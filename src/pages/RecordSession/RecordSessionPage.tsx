import React, { Fragment, useEffect, useState } from "react";
import CameraVerticalPositionSetupPage from "./CameraVerticalPositionSetupPage";
import CameraHorizontalPositionSetupPage from "./CameraHorizontalPositionSetupPage";
import RecordVideoPage from "./RecordVideoPage";
import ProcessRecordingPage from "./ProcessRecording";

function RecordSessionPage() {
  const [step, setStep] = useState(0);
  const [recordingData, setRecordingData] = useState<Blob[] | null>(null);

  const handleNextPage = () => {
    setStep(step + 1);
  };
  const handlePrevPage = () => {
    setStep(step > 0 ? step - 1 : 0);
  };

  const handleSetRecording = (newRecordingData: Blob[]) => {
    setRecordingData(newRecordingData);
    setStep(3);
  };

  return (
    <Fragment>
      {step === 0 && (
        <CameraHorizontalPositionSetupPage onNext={handleNextPage} />
      )}
      {step === 1 && (
        <CameraVerticalPositionSetupPage
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      )}
      {step === 2 && <RecordVideoPage onNext={handleSetRecording} />}
      {step === 3 && recordingData && (
        <ProcessRecordingPage recording={recordingData} />
      )}
    </Fragment>
  );
}

export default RecordSessionPage;
