import './PhoneOrientationChange.css'

// ----------------------------------------------------------------------

interface PhoneOrientationChangeProps {
  message?: string;
}

export function PhoneOrientationChange({
  message = "Please rotate your device",
}: PhoneOrientationChangeProps) {
  return (
    <div className="PhoneOrientationChange">
      <div className="PhoneOrientationChange-phone"></div>
      <div className="PhoneOrientationChange-message">{message}</div>
    </div>
  );
}
