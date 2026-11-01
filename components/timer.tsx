"use client"

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  timeProp: number;
  activeProp: boolean;
  setActiveProp: (value: boolean) => void;
}

export default function Timer({ timeProp, activeProp, setActiveProp }: TimerProps) {
  const [time, setTime] = useState(timeProp);

  useEffect(() => {
    if (!activeProp) return;

    const endTime = Date.now() + timeProp * 1000;

    const intervalId = setInterval(() => {
      const remainingTime = Math.max(0, (endTime - Date.now()) / 1000);
      setTime(remainingTime);

      if (remainingTime === 0) {
        setActiveProp(false);
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [activeProp, timeProp, setActiveProp]);

  return (
    <div className="space-y-4">
      <p className="text-4xl font-bold tabular-nums">{time.toFixed(1)} s</p>
      <Progress
        value={((timeProp - time) / timeProp) * 100}
        aria-label="Tiempo transcurrido"
      />
    </div>
  );
};