import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
export const metadata = {
  title: "Next.js 13 with Clerk",
};
import { connectDB } from "@/helper/db";

export default function RootLayout(props) {
  connectDB();
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {props.children}
          {props.modal}
        </body>
      </html>
    </ClerkProvider>
  );
}
