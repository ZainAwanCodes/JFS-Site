'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

const bookingSchema = z.object({
  pickupDate: z.string().min(1, 'Please select a pickup date'),
  pickupTime: z.string().min(1, 'Please select a pickup time'),
  pickupLocation: z.string().min(5, 'Please enter pickup location'),
  deliveryLocation: z.string().min(5, 'Please enter delivery location'),
  vehicleType: z.string().min(1, 'Please select a vehicle type'),
  goodsDescription: z.string().min(10, 'Please describe your goods'),
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  specialInstructions: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM',
];

export default function BookingSystem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to checkout instead of just showing success
      router.push('/checkout');

    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <CalendarDays className="text-primary-400 mr-3" size={32} />
            <h2 className="font-display text-3xl font-bold text-white">Book Your Shipment</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <CalendarDays size={18} className="mr-2 text-primary-400" />
                  Pickup Date *
                </label>
                <input
                  {...register('pickupDate')}
                  type="date"
                  min={getMinDate()}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setValue('pickupDate', e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                />
                {errors.pickupDate && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.pickupDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Clock size={18} className="mr-2 text-primary-400" />
                  Pickup Time *
                </label>
                <select
                  {...register('pickupTime')}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.pickupTime && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.pickupTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <MapPin size={18} className="mr-2 text-primary-400" />
                  Pickup Location *
                </label>
                <input
                  {...register('pickupLocation')}
                  type="text"
                  placeholder="Enter pickup address"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                />
                {errors.pickupLocation && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.pickupLocation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <MapPin size={18} className="mr-2 text-accent-400" />
                  Delivery Location *
                </label>
                <input
                  {...register('deliveryLocation')}
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-accent-500 focus:outline-none"
                />
                {errors.deliveryLocation && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.deliveryLocation.message}
                  </p>
                )}
              </div>
            </div>

            {/* Vehicle and Goods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Truck size={18} className="mr-2 text-primary-400" />
                  Vehicle Type *
                </label>
                <select
                  {...register('vehicleType')}
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Package size={18} className="mr-2 text-primary-400" />
                  Goods Description *
                </label>
                <input
                  {...register('goodsDescription')}
                  type="text"
                  placeholder="Describe your goods"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                />
                {errors.goodsDescription && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.goodsDescription.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="03001234567"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                {...register('specialInstructions')}
                rows={3}
                placeholder="Any special requirements or instructions..."
                className="w-full px-4 py-3 bg-dark-700 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-2 text-green-400"
              >
                <CheckCircle size={20} />
                <span>Booking request submitted successfully! We&apos;ll contact you soon to confirm.</span>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Booking...</span>
                </>
              ) : (
                <>
                  <CalendarDays size={20} />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

