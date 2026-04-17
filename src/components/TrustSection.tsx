'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  'Sonic Orbit', 'Bass Energy', 'Orbital Flux', 'Beat Nexus', 'Pulse Collective', 'Cloud Arena'
];

export const TrustSection = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <p className="text-center text-white/40 text-[10px] font-black mb-12 uppercase tracking-[0.3em]">
          Partnered with elite sound engineering labs
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {logos.map((logo, index) => (
             <motion.div
               key={logo}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="flex justify-center"
             >
               <span className="text-sm font-black text-white/60 hover:text-[#7C3AED] transition-colors cursor-default uppercase tracking-tighter italic">
                 {logo}
               </span>
             </motion.div>
           ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: '<5ms', sub: 'ENERGY CONSTANT' },
             { label: '1M+', sub: 'ORBITAL ARTISTS' },
             { label: '4K+', sub: 'ORBITAL TERMINALS' }
           ].map((stat, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.2 }}
               className="text-center p-8 bg-[#131313] rounded-3xl border border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500"
             >
               <div className="text-6xl font-black text-white mb-2 tracking-tighter italic group-hover:text-[#D4AF37] transition-colors">{stat.label}</div>
               <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">{stat.sub}</div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
