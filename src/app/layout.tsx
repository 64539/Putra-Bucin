import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Untuk Fathiyyah Tercinta ❤️ | Putra',
  description: 'Aplikasi romantis spesial untuk Fathiyyah. Hari jadian 22 Agustus 2025.',
  authors: [{ name: 'Putra' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💌</text></svg>',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0e0514',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-[#0b040e] text-[#fff1f2] antialiased min-h-screen overflow-x-hidden selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
