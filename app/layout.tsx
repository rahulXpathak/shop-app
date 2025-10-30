import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/component/header/header';
import Footer from '@/component/Footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'mettā muse - Sustainable Artisan Goods',
  description: 'Shop sustainable and unique products from artisans worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // SEO Schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'mettā muse',
    url: 'https://your-website-url.com', // Replace with your final URL
    logo: 'https://your-website-url.com/logo.svg', // Replace with your final URL
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44 221 133 5360',
      contactType: 'Customer Service',
      email: 'customercare@mettamuse.com'
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add the schema script to the body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        <Header />
        <main>{children}</main>
        <Footer /> 
        
      </body>
    </html>
  );
}