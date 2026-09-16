import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "SnapFit | 분위기로 찾는 스냅 작가",
  description:
    "어려운 검색 없이, 원하는 분위기로 찾는 스냅 사진 작가 큐레이션 서비스 SnapFit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={scriptFont.variable}>
      <body className="bg-base-950 text-white antialiased">{children}</body>
    </html>
  );
}
