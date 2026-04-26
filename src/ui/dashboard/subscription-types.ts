export interface Subscription {
  id: string;
  userId: string;
  plan: "oneMonth" | "quarter" | "halfYear" | "year";
  status: "active" | "expired" | "cancelled";
  startsAt: string;
  expiresAt: string;
}
