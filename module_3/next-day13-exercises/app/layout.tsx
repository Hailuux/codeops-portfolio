import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'ADDIS EATS | Orders Analytics', description: 'Accessible Ethiopian birr analytics dashboard exercise.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
