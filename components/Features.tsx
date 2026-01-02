'use client';

import { motion } from 'framer-motion';
import { Package, MapPin, DollarSign, Headphones, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Wide Range of Vehicles',
    description: 'Mazdas, Hyundais, Shehzores, and Special Containers to meet all your transportation needs.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description: 'We deliver across Pakistan with reliable routes and timely service.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Transparent and competitive pricing with no hidden charges.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is available round the clock to assist you.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We understand the importance of deadlines and deliver on time, every time.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your goods are protected with our comprehensive safety measures and insurance.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We provide exceptional transportation services with a focus on reliability, 
            safety, and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-accent-500/50 transition-all group"
            >
              <motion.div 
                className="bg-primary-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="text-primary-500" size={28} />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

