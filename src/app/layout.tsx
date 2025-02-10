import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
     variable: '--font-geist-sans',
     subsets: ['latin'],
});

const geistMono = Geist_Mono({
     variable: '--font-geist-mono',
     subsets: ['latin'],
});

export const metadata: Metadata = {
     title: 'AI Beauty',
     description: 'AI Beauty',
     openGraph: {
          title: 'AI Beauty',
          description: 'AI Beauty',
          type: 'website',
          locale: 'vi_VN',
          url: 'https://external.365sharing.org',
          siteName: 'AI Beauty',
          images: [
               {
                    url: `https://og.railway.app/api/image?fileType=png&layoutName=Simple&title=AI+Beauty&subtitle=Transform+your+beauty+with+AI&theme=dark`,
                    width: 1200,
                    height: 630,
                    alt: 'AI Beauty preview image',
               },
          ],
     },
     twitter: {
          card: 'summary_large_image',
          title: 'AI Beauty',
          description: '365 AI Beauty',
          creator: '@365Team',
          images: [
               `https://og.railway.app/api/image?fileType=png&layoutName=Simple&title=AI+Beauty&subtitle=Transform+your+beauty+with+AI&theme=dark`,
          ],
     },
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <head>
                    <link
                         rel="preload"
                         href="/path/to/important/image.jpg"
                         as="image"
                    />
               </head>
               <body
                    cz-shortcut-listen="true"
                    className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased`}
               >
                    {children}
               </body>
          </html>
     );
}
