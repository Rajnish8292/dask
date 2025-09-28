import SmoothScroll from "@/components/ui/SmoothScroll/SmoothScroll";
import "./globals.css";

export const metadata = {
  title: "Dask",
  description: "Ai powered search engine to search dsa problems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
