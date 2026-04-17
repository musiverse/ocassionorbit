'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';

export const CTASection = ({ onBookingClick }: { onBookingClick?: () => void }) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden glass rounded-[3rem] border border-white/20 p-12 md:p-24 text-center"
        >
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#7C3AED]/10 via-[#7C3AED]/5 to-transparent -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px]" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-sm font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Ready to ignite your presence?
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.85] uppercase italic">
              Experience the<br />
              <span className="text-glow text-[#D4AF37] not-italic uppercase tracking-tighter">Energy.</span>
            </h2>
            
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] max-w-xl mx-auto leading-loose">
              Join the elite league of artists performing on the world&apos;s most 
              advanced orbital network. Your audience is waiting.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button 
                onClick={onBookingClick}
                size="lg" 
                className="w-full sm:w-auto text-xl px-12 py-6 bg-white text-black hover:bg-[#D4AF37] hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] border-none"
              >
                Register Yourself
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Watch Live Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
