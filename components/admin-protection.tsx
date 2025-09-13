import type React from "react";

interface AdminProtectionProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function AdminProtection({
  allowedRoles,
  children,
}: AdminProtectionProps) {
  // For now, just render children - you can add authentication logic later
  return <>{children}</>;
}
