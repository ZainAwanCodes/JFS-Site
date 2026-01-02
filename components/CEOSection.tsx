"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function CEOSection() {
    return (
        <section className="py-20 bg-dark-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[500px] w-full max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-primary-500/20 shadow-2xl shadow-primary-500/10">
                            <Image
                                src="/ceo-new.png"
                                alt="Malik Aslam Awan - CEO JFS"
                                fill
                                className="object-cover object-top"
                            />
                            {/* Overlay Gradient for text readability if needed, but keeping it clean for now */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-60"></div>
                        </div>

                        {/* Name Card floating */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-dark-800/90 backdrop-blur-md border border-primary-500/30 p-4 rounded-xl text-center shadow-lg"
                        >
                            <h3 className="text-xl font-bold text-white font-display">Malik Aslam Awan</h3>
                            <p className="text-primary-400 text-sm font-medium tracking-wider">CEO & Owner</p>
                            <p className="text-gray-400 text-xs mt-1">Jeeway Fateh Sons Goods Transport Faisalabad</p>
                        </motion.div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        <div className="flex items-center justify-center md:justify-start space-x-2">
                            <div className="h-1 w-12 bg-primary-500 rounded-full"></div>
                            <span className="text-primary-400 font-bold tracking-widest uppercase text-sm">Visionary Leadership</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                            Driving Excellence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                                Across Pakistan
                            </span>
                        </h2>

                        <div className="relative p-8 bg-dark-800 rounded-2xl border border-gray-700 mt-8">
                            <Quote className="absolute top-4 left-4 text-primary-600/20 w-12 h-12 rotate-180" />

                            <blockquote className="relative z-10 text-lg md:text-xl text-gray-300 italic leading-relaxed">
                                &ldquo;Our mission is simple yet ambitious: to redefine goods transport in Pakistan. We don&apos;t just move cargo; we carry the trust of our clients. My vision for Jeeway Fateh Sons is to build a legacy of speed, safety, and unwavering integrity, ensuring that every shipment we handle strengthens the backbone of our nation&apos;s commerce.&rdquo;
                            </blockquote>

                            <Quote className="absolute bottom-4 right-4 text-primary-600/20 w-12 h-12" />
                        </div>

                        <div className="pt-4">
                            <p className="text-gray-400 text-sm">
                                Serving with pride from Faisalabad to every corner of the country.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
