import React, { Fragment, useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/useDeviceOrientation";
import CameraVerticalPositionSetupPage from "./CameraVerticalPositionSetupPage";
import CameraHorizontalPositionSetupPage from "./CameraHorizontalPositionSetupPage";
import RecordVideoPage from "./RecordVideoPage";

function RecordSessionPage() {
  const orientation = useDeviceOrientation();
  const [step, setStep] = useState(0);

  // console.log(detector);
  const isLandscape =
    orientation.beta == null ||
    Math.abs(orientation.beta) < 20 ||
    Math.abs(orientation.beta) > 160;

  const handleNextPage = () => {
    setStep(step + 1);
  };
  const handlePrevPage = () => {
    setStep(step > 0 ? step - 1 : 0);
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
      {step === 2 && (
          <RecordVideoPage
              onPrev={handlePrevPage}
          />
      )}
    </Fragment>
  );
}

export default RecordSessionPage;
