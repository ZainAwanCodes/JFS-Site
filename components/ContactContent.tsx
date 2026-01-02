'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactContent() {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a question or ready to book your shipment? Contact us today and our team will be happy to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <Phone className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">CEO - Malik Aslam Awan</h3>
                    <div className="space-y-1">
                      <a href="tel:03006614521" className="block text-primary-400 hover:text-primary-300 transition-colors">
                        03006614521
                      </a>
                      <a href="tel:03336614521" className="block text-primary-400 hover:text-primary-300 transition-colors">
                        03336614521
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <Phone className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Office Numbers</h3>
                    <div className="space-y-1">
                      <a href="tel:03216614521" className="block text-primary-400 hover:text-primary-300 transition-colors">
                        03216614521
                      </a>
                      <a href="tel:03196614521" className="block text-primary-400 hover:text-primary-300 transition-colors">
                        03196614521
                      </a>
                      <a href="tel:03296614521" className="block text-primary-400 hover:text-primary-300 transition-colors">
                        03296614521
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <MapPin className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Our Location</h3>
                    <p className="text-gray-300">
                      Rajbah Road Railway Mall Godam<br />
                      Faisalabad, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <Clock className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Working Hours</h3>
                    <p className="text-gray-300">
                      Available 24/7<br />
                      We&apos;re always here to help you!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Find Us on Map</h3>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Rajbah%20Road%20Railway%20Mall%20Godam%20Faisalabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="https://maps.google.com/maps?q=Rajbah%20Road%20Railway%20Mall%20Godam%20Faisalabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded-lg transition-colors border border-primary-500/30"
                >
                  <MapPin size={18} className="mr-2" />
                  Open in Google Maps
                </a>
                <a
                  href="https://maps.google.com/maps/dir/?api=1&destination=Rajbah%20Road%20Railway%20Mall%20Godam%20Faisalabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 rounded-lg transition-colors border border-accent-500/30"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

