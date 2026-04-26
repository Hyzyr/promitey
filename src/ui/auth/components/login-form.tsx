"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

const schema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(8, "Минимум 8 символов"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormValues) {
    // TODO: call auth API
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="admin@prometey.vpn"
        leftIcon={Mail}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="••••••••"
        leftIcon={Lock}
        error={errors.password?.message}
        {...register("password")}
      />
      <Button
        variant="orange"
        size="lg"
        className="mt-2 w-full"
        type="submit"
        isLoading={isSubmitting}
      >
        Войти
      </Button>
      <Button variant="secondary" size="md" className="w-full" type="button">
        Создать аккаунт
      </Button>
    </form>
  );
}
