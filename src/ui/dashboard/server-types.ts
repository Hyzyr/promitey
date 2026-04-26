export interface Server {
  id: string;
  name: string;
  location: string;
  ip: string;
  status: "online" | "offline" | "maintenance";
  load: number;
}
