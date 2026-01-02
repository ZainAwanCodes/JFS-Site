'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Truck, ArrowRight } from 'lucide-react';

const services = [
  {
    name: 'Mazdas',
    description: 'Perfect for medium-sized goods, safe and reliable transport.',
    image: '🚚',
  },
  {
    name: 'Hyundais',
    description: 'For larger consignments, ensuring timely delivery across Pakistan.',
    image: '🚛',
  },
  {
    name: 'Shehzores',
    description: 'Flexible, quick transport for smaller loads or urgent orders.',
    image: '🚗',
  },
  {
    name: 'Special Container',
    description: 'Securely transport any kind of goods with loading/unloading at your place.',
    image: '📦',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900/50 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our wide range of transportation solutions tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-accent-500/50 transition-all group"
            >
              <motion.div 
                className="text-6xl mb-4 text-center"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                {service.image}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">{service.name}</h3>
              <p className="text-gray-400 text-center mb-4">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-accent-700 transition-all transform hover:scale-105"
          >
            <Truck size={20} />
            <span>View All Services</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

