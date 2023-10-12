import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
export const metadata = {
  title: "Next.js 13 with Clerk",
};
import {connectDB} from '@/helper/db'

export default function RootLayout({ children }) {
  connectDB();
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
