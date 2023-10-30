import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

export const metadata = {
  title: "Limited Edition Bricks Hub",
  description: "A website for pre-ordering Limited Edition Bricks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
