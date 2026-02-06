"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountDownOptions {
  seconds: number;
  onFinish?: () => void;
  autoStart?: boolean;
}

export default function useCountDown({
  seconds,
  onFinish,
  autoStart = false,
}: UseCountDownOptions) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          setIsRunning(false);
          onFinishRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    clear();
    setTimeLeft(seconds);
    setIsRunning(false);
  }, [seconds]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clear;
  }, [autoStart, start]);

  return {
    timeLeft,
    isRunning,
    start,
    reset,
  };
}
