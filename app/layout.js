import './globals.css';
import './redesign.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export const metadata = {
  metadataBase: new URL('https://makeitkult.com'),
  title: { default: 'KULT Co. | PR & Event Management', template: '%s | KULT Co.' },
  description: 'A Pakistan-based PR and event management agency creating bold brand experiences, launches and cultural moments.',
  openGraph: { title: 'KULT Co.', description: 'We make moments matter.', images: ['/images/hero.png'] }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><div className="grain"/><div className="ambient"/><Header/><main>{children}</main><Footer/><Chatbot/></body></html>;
}
