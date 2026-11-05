import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Money Dashboard | MyPortal",
  description: "毎月の積立額と想定利回りから資産推移を試算します。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
