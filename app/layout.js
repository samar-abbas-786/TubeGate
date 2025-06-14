import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@components/Navbar/page";
import { AuthProvider } from "../context/authContext";
import Provider from "context/oauth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TubeGate",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <AuthProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </AuthProvider>
    </Provider>
  );
}
