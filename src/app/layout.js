import './globals.css';
import ClientLayout from '../ClientLayout';
import { AuthProvider } from './context/AuthContext';


export const metadata = {
  title: 'My Dashboard App',
  description: 'A modern dashboard built with Next.js and MUI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap with AuthProvider */}
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
