'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic2, 
  Activity, 
  Globe, 
  Music2, 
  Headphones, 
  Cpu 
} from 'lucide-react';

const features = [
  {
    icon: Mic2,
    title: 'Energy Modulation',
    description: 'AI-driven orbital analysis that modulates your energy and tone in real-time across the orbit.',
    color: 'text-[#D4AF37]'
  },
  {
    icon: Activity,
    title: 'Live FX Stacking',
    description: 'Studio-grade effects modules directly from your performance interface.',
    color: 'text-white/60'
  },
  {
    icon: Globe,
    title: 'Global Staging',
    description: 'Broadcast your voice to thousands of live venues simultaneously.',
    color: 'text-blue-400'
  },
  {
    icon: Music2,
    title: 'Dynamic Multi-Track',
    description: 'Collaborate with instrumentalists globally with zero-latency flow.',
    color: 'text-[#D4AF37]'
  },
  {
    icon: Headphones,
    title: 'Immersive Monitoring',
    description: 'Spatial 3D audio monitoring for the most natural stage feeling.',
    color: 'text-green-400'
  },
  {
    icon: Cpu,
    title: 'Neural Mixing',
    description: 'Automated engineer that balances your levels during live sets.',
    color: 'text-brand-gold'
  }
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white mb-6">
            Engineered for <span className="text-[#D4AF37] not-italic">Energy</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-xs font-bold uppercase tracking-[0.2em] leading-loose">
            Everything you need to broadcast, record, and perform at the highest professional level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 blur-3xl -z-10 group-hover:bg-[#7C3AED]/20 transition-colors" />
              
              <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
