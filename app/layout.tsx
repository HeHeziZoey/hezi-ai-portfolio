import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "AI 产品运营作品集 | HZ";
const description =
  "面向招聘方的中文 AI 产品运营作品集，展示内容增长、产品工作流、评测和人工审核能力。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const socialImage = `${baseUrl}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: baseUrl,
      locale: "zh_CN",
      images: [
        {
          url: socialImage,
          width: 1680,
          height: 945,
          alt: "AI 产品运营作品集，让每个项目都经得起追问",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
