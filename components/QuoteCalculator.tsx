'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import RouteMap from './RouteMap';
import { useAdmin } from '@/context/AdminContext';

export default function QuoteCalculator() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    distance: '',
    weight: '',
    origin: '',
    destination: '',
  });
  const [quote, setQuote] = useState<number | null>(null);

  const { rates } = useAdmin();

  // Use rates from context, fallback to defaults just in case
  const vehicleRates: { [key: string]: number } = {
    mazda: rates.mazda,
    hyundai: rates.hyundai,
    shehzore: rates.shehzore,
    container: rates.container,
  };

  const calculateQuote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleType || !formData.distance) {
      alert('Please fill in vehicle type and distance');
      return;
    }

    const baseRate = vehicleRates[formData.vehicleType] || 0;
    const distance = parseFloat(formData.distance) || 0;
    const weight = parseFloat(formData.weight) || 1;

    // Dynamic calculation: base rate * distance * perKmRate * weight factor
    const calculatedQuote = baseRate * distance * rates.perKmRate * (1 + (weight - 1) * rates.weightMultiplier);
    setQuote(Math.round(calculatedQuote));
  };

  return (
    <section className="py-20 bg-dark-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
        >
          <div className="flex items-center justify-center mb-6">
            <Calculator className="text-primary-400 mr-3" size={32} />
            <h2 className="font-display text-3xl font-bold text-white">Get a Quick Quote</h2>
          </div>

          <form onSubmit={calculateQuote} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vehicle Type *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  required
                >
                  <option value="">Select Vehicle</option>
                  <option value="mazda">Mazda</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="shehzore">Shehzore</option>
                  <option value="container">Special Container</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Distance (km) *
                </label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Enter distance"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (tons)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Enter weight (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Enter origin city"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                placeholder="Enter destination city"
              />
            </div>

            <div className="grid-cols-1 md:col-span-2">
              <RouteMap origin={formData.origin} destination={formData.destination} />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center space-x-2"
            >
              <span>Calculate Quote</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
          </form>

          {quote !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className="mt-6 p-6 bg-primary-500/10 border border-primary-500/30 rounded-lg"
            >
              <p className="text-gray-300 mb-2">Estimated Quote:</p>
              <p className="text-3xl font-bold text-primary-400">PKR {quote.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-2">
                * This is an approximate quote. Contact us for exact pricing and booking.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="/booking"
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-center transition-colors"
                >
                  Book Now
                </a>
                <a
                  href="/contact"
                  className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg font-semibold text-center border border-gray-600 transition-colors"
                >
                  Get Exact Quote
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

