import "./globals.css";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PostPedia",
  description:
    "A simple app for creating, storing , deleting, copying & editing the post",
  author: "Muhammad Owais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
