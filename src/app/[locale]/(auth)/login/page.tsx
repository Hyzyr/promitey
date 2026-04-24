import { LoginForm } from "@/components/features/auth/login-form";
import { Shield } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Shield className="h-10 w-10 text-primary-500" />
        <h1 className="text-2xl font-semibold text-neutral-900">Prometey VPN</h1>
        <p className="text-sm text-neutral-300">Войдите в панель управления</p>
      </div>
      <LoginForm />
    </div>
  );
}
