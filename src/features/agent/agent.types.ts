export type AgentIntent =
  | "schedule_meeting"
  | "send_email"
  | "create_ticket"
  | "unknown";

export interface ApprovalPreview {
  title?: string;
  participants?: string[];
  [key: string]: unknown;
}

interface AgentBaseResponse {
  intent: AgentIntent;
  message: string;
}

export interface AgentSuccessResponse extends AgentBaseResponse {
  status: "success";
}

export interface AgentApprovalResponse extends AgentBaseResponse {
  status: "needs_approval";
  data: {
    approvalId: string;
    preview: ApprovalPreview;
  };
}

export interface AgentErrorResponse extends AgentBaseResponse {
  status: "error";
  data?: {
    error: string;
  };
}

export type AgentResponse =
  | AgentSuccessResponse
  | AgentApprovalResponse
  | AgentErrorResponse;

export type ChatRole = "user" | "assistant";

export interface MessageApproval {
  approvalId: string;
  intent: AgentIntent;
  preview: ApprovalPreview;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  isError?: boolean;
  approval?: MessageApproval;
}
