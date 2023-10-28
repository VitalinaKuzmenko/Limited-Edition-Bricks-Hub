export const metadata = {
  title: "Limited Edition Bricks Hub",
  description: "A website for preordering Limited Edition Bricks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
