import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { PeraWalletConnect } from '@perawallet/connect';
import { PeraWalletProvider } from '../providers/wallet-provider/wallet-provider';

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Algorand Frontend Template',
  description: 'Generated by create next app',
};

// Wrap your root layout or _app.tsx with PeraWalletProvider to manage the wallet connection globally and avoid multiple instances of the wallet.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter&family=Noto+Sans&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <PeraWalletProvider>{children}</PeraWalletProvider>
      </body>
    </html>
  );
}
