'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What types of vehicles do you offer?',
    answer: 'We offer Mazdas for medium-sized goods, Hyundais for larger consignments, Shehzores for smaller loads, and Special Container services for all types of goods with loading/unloading at your location.',
  },
  {
    question: 'Do you provide nationwide delivery?',
    answer: 'Yes, we provide transportation services across Pakistan. Our extensive network ensures timely and safe delivery to major cities and towns throughout the country.',
  },
  {
    question: 'How do I book a shipment?',
    answer: 'You can book a shipment by calling our 24/7 helpline, filling out the contact form on our website, or visiting our office in Faisalabad. Our team will guide you through the booking process and provide a quote.',
  },
  {
    question: 'What are your pricing rates?',
    answer: 'Our pricing depends on various factors including vehicle type, distance, weight, and specific requirements. We offer competitive and transparent pricing with no hidden charges. Use our quote calculator or contact us for an accurate estimate.',
  },
  {
    question: 'Do you provide loading and unloading services?',
    answer: 'Yes, we provide loading and unloading services at your requested location for all our Special Container services. Please mention this requirement when booking.',
  },
  {
    question: 'How can I track my shipment?',
    answer: 'Currently, you can track your shipment by calling our office numbers. We are working on implementing an online tracking system. Our team will keep you updated throughout the delivery process.',
  },
  {
    question: 'What safety measures do you have in place?',
    answer: 'We prioritize the safety of your goods. Our vehicles are well-maintained, we have comprehensive insurance coverage, and our team follows strict safety protocols during transportation and handling.',
  },
  {
    question: 'What are your working hours?',
    answer: 'We are available 24/7 to assist you. You can contact us at any time via phone or through our website for bookings and inquiries.',
  },
];

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="text-primary-400 mr-3" size={48} />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our transportation services.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-700/50 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`text-primary-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-accent-500/10 border border-accent-500/30 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-300 mb-6">
            Our team is here to help. Contact us anytime!
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-accent-700 transition-all transform hover:scale-105"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

