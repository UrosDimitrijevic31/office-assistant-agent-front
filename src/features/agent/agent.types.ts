export type AgentIntent =
  | "unknown"
  | "schedule_meeting"
  | "send_email"
  | "create_ticket";

export type AgentStatus = "success" | "needs_approval" | "error";

export type ActionIntent = Exclude<AgentIntent, "unknown">;

export type AgentResponse =
  | {
      status: "success";
      intent: "unknown";
      message: string;
      data?: undefined;
    }
  | {
      status: "needs_approval";
      intent: ActionIntent;
      message: string;
      data: {
        approvalId: string;
        preview: Record<string, unknown>;
      };
    }
  | {
      status: "error";
      intent: "unknown";
      message: string;
      data?: {
        error?: string;
      };
    };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  isError?: boolean;
  approvalId?: string;
  approvalData?: {
    intent: ActionIntent;
    preview: Record<string, unknown>;
  };
};

export type PendingApproval = {
  id: string;
  intent: ActionIntent;
  preview: Record<string, unknown>;
  createdAt: string;
};
