import { useState, useEffect } from 'react';

export default function ProgressBar({ value = 50, max = 100 }) {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const percentage = (progress / max) * 100;

  return (
    <div className="progress-container w-100">
      <div className="progress-bar1" style={{ width: `${percentage}%` }} />
    </div>
  );
}