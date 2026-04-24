export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  status: "active" | "inactive" | "banned";
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "oneMonth" | "quarter" | "halfYear" | "year";
  status: "active" | "expired" | "cancelled";
  startsAt: string;
  expiresAt: string;
}

export interface Server {
  id: string;
  name: string;
  location: string;
  ip: string;
  status: "online" | "offline" | "maintenance";
  load: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
