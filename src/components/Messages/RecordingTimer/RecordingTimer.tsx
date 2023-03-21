import "./RecordingTimer.css";

// ----------------------------------------------------------------------

interface RecordingTimerProps {
  message?: string;
  time: number;
}

export function RecordingTimer({
  time,
  message = "Recording in",
}: RecordingTimerProps) {
  return (
    <div className="RecordingTimer">
      <div className="RecordingTimer-message">{message}</div>
      <div className="RecordingTimer-time">{time}s</div>
    </div>
  );
}
