import type React from "react";

interface ResponsiveLayoutProps {
  title: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function ResponsiveLayout({
  title,
  fullWidth = false,
  children,
}: ResponsiveLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gray-50 ${fullWidth ? "w-full" : "max-w-7xl mx-auto"}`}
    >
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
