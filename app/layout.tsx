import './globals.css';
import { ReactNode } from 'react';
import SessionWrapper from '../components/SessionWrapper';
import { CartProvider } from '../context/CartContext';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SessionWrapper>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}
