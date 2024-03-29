import { useState, useEffect } from "react";

const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState({
    absolute: null,
    alpha: null,
    beta: null,
    gamma: null,
  });

  const handleOrientationChange = ({
    absolute = null,
    alpha = null,
    beta = null,
    gamma = null,
  }) => {
    setOrientation({ absolute, alpha, beta, gamma });
  };

  useEffect(() => {
    // @ts-ignore
    window.addEventListener("deviceorientation", handleOrientationChange);
    return () => {
      // @ts-ignore
      window.removeEventListener("deviceorientation", handleOrientationChange);
    };
  }, []);

  return orientation;
};

export default useDeviceOrientation;
