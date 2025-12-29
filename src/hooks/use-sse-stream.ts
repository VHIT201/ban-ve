import { useAuthStore } from "@/stores";
import { useEffect, useRef } from "react";

interface UseSSEOptions<T> {
  url: string;
  enable?: boolean;
  onEvent: (event: string, data: T) => void;
}

export default function useSSEStream<T>({
  url,
  enable = true,
  onEvent,
}: UseSSEOptions<T>) {
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const authStore = useAuthStore.getState();

    if (!url || !enable || !authStore.accessToken) return;

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
          Accept: "text/event-stream",
        },
        signal: controller.signal,
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        let eventName = "message";

        for (const line of lines) {
          if (line.startsWith("event:")) {
            eventName = line.replace("event:", "").trim();
          }

          if (line.startsWith("data:")) {
            const json = line.replace("data:", "").trim();
            onEvent(eventName, JSON.parse(json));
          }
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url, enable]);
}
