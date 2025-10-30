import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

// Helper component for the link columns to keep code clean
const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <div>
    <h3 className="text-lg font-bold mb-4 uppercase text-white">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  // Data for the link columns
  const mettaMuseLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Stories', href: '/stories' },
    { name: 'Artisans', href: '/artisans' },
    { name: 'Boutiques', href: '/boutiques' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'EU Compliances Docs', href: '/eu-compliance' },
  ];

  const quickLinks = [
    { name: 'Orders & Shipping', href: '/orders' },
    { name: 'Join/Login as a Seller', href: '/seller' },
    { name: 'Payment & Pricing', href: '/payment' },
    { name: 'Return & Refunds', href: '/returns' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="w-full bg-black text-gray-300">
      <div className="max-w-[1248px] mx-auto px-4">
        
        {/* Top Section: Newsletter and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
          
          {/* Left: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase text-white">
              Be the first to know
            </h3>
            <p className="mb-4 text-sm">Sign up for updates from mettā muse.</p>
            <form className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your e-mail..."
                className="flex-grow p-3 bg-white text-black rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="p-3 bg-black text-white border border-l-0 border-white rounded-r-md uppercase hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right: Contact & Currency */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase text-white">
              Contact Us
            </h3>
            <p className="mb-2">+44 221 133 5360</p>
            <p className="mb-6">customercare@mettamuse.com</p>

            <h3 className="text-lg font-bold mb-4 uppercase text-white">
              Currency
            </h3>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🇺🇸</span>
              <span className="font-bold">USD</span>
            </div>
            <p className="text-xs text-gray-400">
              Transactions will be completed in Euros and a currency reference is
              available on hover.
            </p>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-gray-700">
          <FooterLinkColumn title="mettā muse" links={mettaMuseLinks} />
          <FooterLinkColumn title="Quick Links" links={quickLinks} />

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase text-white">
              Follow Us
            </h3>
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 border border-gray-500 rounded-full hover:bg-white hover:text-black transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 border border-gray-500 rounded-full hover:bg-white hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase text-white">
              mettā muse ACCEPTS
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* In a real app, these would be <Image> components */}
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">G Pay</span>
              </div>
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">MasterCard</span>
              </div>
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">PayPal</span>
              </div>
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">AMEX</span>
              </div>
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">Apple Pay</span>
              </div>
              <div className="bg-white p-1 rounded">
                <span className="text-black font-bold">O Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center py-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Copyright © 2023 mettā muse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;