import { useMutation } from "@tanstack/react-query";
import { sendAgentMessage } from "./agent.api";

export function useSendMessage() {
  return useMutation({
    mutationFn: sendAgentMessage,
  });
}
