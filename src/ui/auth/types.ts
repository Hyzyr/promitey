export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  status: "active" | "inactive" | "banned";
}
