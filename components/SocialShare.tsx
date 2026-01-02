'use client';

import { Facebook, Twitter, Linkedin, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

export default function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'JFS Goods Transport - Reliable Transport Services',
  description = 'Professional goods transportation services across Pakistan'
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-400">Share:</span>
      <div className="flex items-center space-x-2">
        <motion.a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-800 hover:bg-blue-600 rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} className="text-white" />
        </motion.a>
        
        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-800 hover:bg-sky-500 rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} className="text-white" />
        </motion.a>

        <motion.a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-800 hover:bg-blue-700 rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} className="text-white" />
        </motion.a>

        <motion.a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-800 hover:bg-[#25D366] rounded-lg transition-colors"
          aria-label="Share on WhatsApp"
        >
          <Share2 size={18} className="text-white" />
        </motion.a>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} className="text-gray-400" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

