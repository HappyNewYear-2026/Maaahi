import "./globals.css"

export const metadata = {
  title: "Happy Birthday Maahi....! 💕",
  description: "ہمیشہ خوش رہیں...🌹",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
