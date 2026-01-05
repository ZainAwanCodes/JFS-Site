'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  vehicleType: z.string().min(1, 'Please select a vehicle type'),
  origin: z.string().min(2, 'Please enter origin location'),
  destination: z.string().min(2, 'Please enter destination location'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone *
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              placeholder="03001234567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Vehicle Type *
          </label>
          <select
            {...register('vehicleType')}
            className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors"
          >
            <option value="">Select Vehicle</option>
            <option value="mazda">Mazda</option>
            <option value="hyundai">Hyundai</option>
            <option value="shehzore">Shehzore</option>
            <option value="container">Special Container</option>
          </select>
          {errors.vehicleType && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.vehicleType.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Origin *
            </label>
            <input
              {...register('origin')}
              type="text"
              className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              placeholder="City name"
            />
            {errors.origin && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.origin.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Destination *
            </label>
            <input
              {...register('destination')}
              type="text"
              className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              placeholder="City name"
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.destination.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={5}
            className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your shipment requirements..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.message.message}
            </p>
          )}
        </div>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-2 text-green-400"
          >
            <CheckCircle size={20} />
            <span>Message sent successfully! We&apos;ll get back to you soon.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-400"
          >
            <AlertCircle size={20} />
            <span>Something went wrong. Please try again or call us directly.</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: isSubmitting ? 'none' : '0 10px 25px rgba(249, 115, 22, 0.3)' }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
