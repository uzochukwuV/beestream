
import "./globals.css";
import Provider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}

export const metadata = {
      generator: 'v0.app'
    };
