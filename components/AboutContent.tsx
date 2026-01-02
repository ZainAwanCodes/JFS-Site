'use client';

import { motion } from 'framer-motion';
import { Target, Shield, Users, Award } from 'lucide-react';

export default function AboutContent() {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your trusted partner for reliable goods transportation services across Pakistan.
          </p>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 mb-8"
        >
          <h2 className="text-3xl font-bold text-primary-400 mb-4 flex items-center">
            <Users className="mr-3" size={32} />
            Who We Are
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Fateh Sons Goods Transport is a trusted name in goods transportation services across Pakistan. 
            With years of experience, we have built a reputation for reliability, safety, and affordability. 
            From small deliveries to large consignments, we provide solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 mb-8"
        >
          <h2 className="text-3xl font-bold text-primary-400 mb-4 flex items-center">
            <Target className="mr-3" size={32} />
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is to make goods transportation <strong className="text-white">efficient, safe, and cost-effective</strong>. 
            We aim to provide excellent service while ensuring customer satisfaction, every step of the way. 
            We believe in building long-term relationships with our clients through transparency, reliability, and exceptional service.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 mb-8"
        >
          <h2 className="text-3xl font-bold text-primary-400 mb-6 flex items-center">
            <Award className="mr-3" size={32} />
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Wide range of vehicles – Mazdas, Hyundais, Shehzores, and Special Containers',
              'Affordable and transparent pricing with no hidden charges',
              'Loading and unloading at your requested location',
              'Dedicated team of professionals available 24/7',
              'Nationwide coverage across Pakistan',
              'Safe and secure handling of your goods',
              'On-time delivery guarantee',
              'Excellent customer support and service',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                className="flex items-start space-x-3"
              >
                <Shield className="text-primary-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/30 p-8 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
              <p className="text-gray-300">We deliver on our promises, every time.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Safety</h3>
              <p className="text-gray-300">Your goods are in safe hands with us.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
              <p className="text-gray-300">We strive for perfection in everything we do.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

