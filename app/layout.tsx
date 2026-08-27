import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "季添熠 | AI 项目作品集",
  description: "AI 项目实践、AI 内容增长与 AI 应用运营作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
