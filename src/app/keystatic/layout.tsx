export const metadata = {
  title: "Keystatic Admin | SEDS Sri Lanka",
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
