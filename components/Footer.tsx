import Link from 'next/link';
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import SocialShare from './SocialShare';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Jeeway Fateh Sons Goods Transport
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for reliable goods transportation services across Pakistan.
              We provide safe, efficient, and affordable logistics solutions.
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            <div className="mt-4">
              <SocialShare />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-500 hover:text-primary-400 transition-colors text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <div className="text-gray-400 text-sm">
                  <a href="tel:03006614521" className="hover:text-primary-400">
                    03006614521
                  </a>
                  <br />
                  <a href="tel:03336614521" className="hover:text-primary-400">
                    03336614521
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">
                  Rajbah Road Railway Mall<br />
                  Godam, Faisalabad
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jeeway Fateh Sons Goods Transport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

