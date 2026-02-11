import "./globals.css"

export const metadata = {
  title: "Happy Birthday Sneha...! 💕",
  description: "I love you 🌹",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
