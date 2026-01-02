'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    location: 'Lahore',
    text: 'Outstanding service! Our goods arrived on time and in perfect condition. Highly recommend JFS Transport.',
    rating: 5,
  },
  {
    name: 'Fatima Ali',
    location: 'Karachi',
    text: 'Professional team, affordable rates, and excellent customer support. They made our logistics so much easier.',
    rating: 5,
  },
  {
    name: 'Hassan Malik',
    location: 'Islamabad',
    text: 'Been using their services for over a year. Reliable, safe, and always on schedule. Best transport company!',
    rating: 5,
  },
];

export default function Testimonials() {
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
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/50 transition-all relative group"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
              >
                <Quote className="text-primary-400/20 absolute top-4 right-4 group-hover:text-primary-400/30 transition-colors" size={60} />
              </motion.div>
              <motion.div 
                className="flex mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 + i * 0.1, type: 'spring' }}
                  >
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  </motion.div>
                ))}
              </motion.div>
              <p className="text-gray-300 mb-6 relative z-10">{testimonial.text}</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

