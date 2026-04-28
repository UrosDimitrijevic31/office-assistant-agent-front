import type { AgentResponse } from "./agent.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendAgentMessage(
  message: string,
): Promise<AgentResponse> {
  const res = await fetch(`${API_URL}/agent/query`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<AgentResponse>;
}
