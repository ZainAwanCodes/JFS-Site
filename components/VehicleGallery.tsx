'use client';

import { motion } from 'framer-motion';
import { Truck, Package, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

const vehicles = [
  {
    id: 'mazda',
    name: 'Mazda',
    description: 'Perfect for medium-sized goods, safe and reliable transport.',
    icon: Truck,
    capacity: '1-3 tons',
    features: ['Medium-sized goods', 'Safe & reliable', 'Competitive pricing'],
    image: '🚚',
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    description: 'For larger consignments, ensuring timely delivery across Pakistan.',
    icon: Package,
    capacity: '3-5 tons',
    features: ['Large consignments', 'Nationwide delivery', 'Secure handling'],
    image: '🚛',
  },
  {
    id: 'shehzore',
    name: 'Shehzore',
    description: 'Flexible, quick transport for smaller loads or urgent orders.',
    icon: Clock,
    capacity: 'Up to 1 ton',
    features: ['Quick transport', 'Smaller loads', 'Urgent orders'],
    image: '🚗',
  },
  {
    id: 'container',
    name: 'Special Container',
    description: 'Securely transport any kind of goods with loading/unloading at your place.',
    icon: Shield,
    capacity: '5-10 tons',
    features: ['Loading/unloading', 'Secure containers', 'All types of goods'],
    image: '📦',
  },
];

export default function VehicleGallery() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

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
            Our Vehicle Fleet
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our range of vehicles designed to meet all your transportation needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/50 transition-all group cursor-pointer"
            >
              <motion.div 
                className="text-6xl mb-4 text-center"
                whileHover={{ 
                  scale: 1.3,
                  rotate: [0, -15, 15, -15, 0]
                }}
                transition={{ duration: 0.6 }}
              >
                {vehicle.image}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">{vehicle.name}</h3>
              <p className="text-gray-400 text-center mb-4 text-sm">{vehicle.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-primary-400 text-sm font-semibold text-center">
                  Capacity: {vehicle.capacity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for vehicle details */}
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 rounded-xl p-8 max-w-2xl w-full border border-gray-700"
            >
              {(() => {
                const vehicle = vehicles.find((v) => v.id === selectedVehicle);
                if (!vehicle) return null;
                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-6xl">{vehicle.image}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{vehicle.name}</h3>
                          <p className="text-primary-400">Capacity: {vehicle.capacity}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedVehicle(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <p className="text-gray-300 mb-6">{vehicle.description}</p>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {vehicle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-300">
                            <span className="text-primary-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="/booking"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold text-center hover:from-primary-600 hover:to-primary-700 transition-all"
                      >
                        Book This Vehicle
                      </a>
                      <a
                        href="/contact"
                        className="px-6 py-3 bg-dark-700 text-white rounded-lg font-semibold border border-gray-600 hover:bg-dark-600 transition-colors"
                      >
                        Get Quote
                      </a>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

