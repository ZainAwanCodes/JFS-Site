'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Ship Your Goods?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get in touch with us today and experience the best transportation services in Pakistan.
            We&apos;re here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/booking"
                className="group px-8 py-4 bg-white text-accent-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Book Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
            </motion.div>
            <a
              href="tel:03006614521"
              className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
            >
              <Phone size={20} />
              <span>Call Us: 03006614521</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

