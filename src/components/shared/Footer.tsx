
import React from 'react';
import { Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 py-16 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <div className="size-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-white">Merchwaale</h2>
          </div>
          <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">
            Designed exclusively for the NIT Patna Campus. Premium quality student-friendly prices. Supporting your college journey from day one to convocation.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-text-sub hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-text-sub hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-text-sub hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-black text-text-main dark:text-white mb-6 uppercase tracking-wider text-sm">Shop</h4>
          <ul className="space-y-4 text-sm text-text-sub dark:text-gray-400">
            <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Freshers Kits</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Hoodies & Tees</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Thesis Binding</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-text-main dark:text-white mb-6 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-4 text-sm text-text-sub dark:text-gray-400">
            <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Bulk Orders</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-text-main dark:text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-4 text-sm text-text-sub dark:text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>NIT Patna, Ashok Rajpath, Patna, Bihar 800005</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>support@merchwaale.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-text-sub dark:text-gray-500">
        <p>© 2024 Merchwaale. Designed exclusively for NIT Patna Campus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
