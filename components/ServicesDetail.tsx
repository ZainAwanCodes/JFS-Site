'use client';

import { motion } from 'framer-motion';
import { Truck, Package, Clock, Shield, MapPin } from 'lucide-react';

const services = [
  {
    name: 'Mazdas',
    description: 'Perfect for medium-sized goods, safe and reliable transport.',
    icon: Truck,
    features: ['Medium-sized goods', 'Safe & reliable', 'Competitive pricing', 'Timely delivery'],
    image: '🚚',
  },
  {
    name: 'Hyundais',
    description: 'For larger consignments, ensuring timely delivery across Pakistan.',
    icon: Package,
    features: ['Large consignments', 'Nationwide delivery', 'Secure handling', 'Professional service'],
    image: '🚛',
  },
  {
    name: 'Shehzores',
    description: 'Flexible, quick transport for smaller loads or urgent orders.',
    icon: Clock,
    features: ['Quick transport', 'Smaller loads', 'Urgent orders', 'Flexible scheduling'],
    image: '🚗',
  },
  {
    name: 'Special Container Service',
    description: 'Securely transport any kind of goods with loading/unloading at your place.',
    icon: Shield,
    features: ['Loading/unloading', 'Secure containers', 'All types of goods', 'Custom solutions'],
    image: '📦',
  },
];

export default function ServicesDetail() {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We offer a comprehensive range of transportation services to meet all your logistics needs. 
            From small deliveries to large consignments, we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-primary-500/50 transition-all group"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-primary-500/10 p-4 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                  <service.icon className="text-primary-400" size={32} />
                </div>
                <div className="flex-1">
                  <div className="text-5xl mb-2">{service.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <span className="text-primary-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-accent-500/10 border border-accent-500/30 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Services?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <MapPin className="text-accent-400 mb-2" size={32} />
              <p className="text-gray-300">Nationwide Coverage</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-primary-500 mb-2" size={32} />
              <p className="text-gray-300">100% Safe & Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="text-accent-400 mb-2" size={32} />
              <p className="text-gray-300">On-Time Delivery</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

