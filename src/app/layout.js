import "./globals.css";

export const metadata = {
  title: "Dask",
  description: "AI powered search engine to search dsa problems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
