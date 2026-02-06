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

  console.log("SSE Stream URL :", url, " Enable :", enable);

  useEffect(() => {
    const authStore = useAuthStore.getState();

    if (!url || !enable || !authStore.accessToken) {
      return undefined;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
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

        try {
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
                try {
                  onEvent(eventName, JSON.parse(json));
                } catch (parseError) {
                  console.error("Failed to parse SSE data:", json, parseError);
                }
              }
            }
          }
        } catch (readError) {
          if (readError.name !== 'AbortError') {
            console.error("Error reading SSE stream:", readError);
          }
        } finally {
          reader.releaseLock();
        }
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          console.error("Error fetching SSE stream:", fetchError);
        }
      }
    })();

    return () => {
      console.log("CLOSE CONNECTING");
      if (controller && !controller.signal.aborted) {
        controller.abort();
      }
    };
  }, [url, enable, onEvent]);
}
