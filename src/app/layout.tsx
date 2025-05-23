import './globals.css';

import { ReactNode } from 'react';

export const metadata = {
  title: 'Clínica Tech',
  description: 'Sistema de Gestão de Clínica Futurista 🚀',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
