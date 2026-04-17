'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Zap, Shield, Globe, Star, Home } from 'lucide-react';

const appScreens = [
  { id: 1, src: '/app-screen-1.png', title: 'Artist Profile' }, // conceptual profile generated
  { id: 2, src: '/app-screen-2.png', title: 'Energy Dashboard' },
  { id: 3, src: '/app-screen-3.png', title: 'Performance Hub' },
  { id: 4, src: '/app-screen-4.png', title: 'Global Orbit' },
  { id: 5, src: '/app-screen-5.png', title: 'Success Sequence' }
];

const appFeatures = [
  {
    icon: Zap,
    title: 'High-Octane Performance',
    description: 'Broadcast with sub-5ms latency directly from your pocket. The stage is wherever you are.'
  },
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'Access thousands of virtual and physical venues across the OcassionOrbit network.'
  },
  {
    icon: Shield,
    title: 'Secure Earnings',
    description: 'Real-time revenue tracking and instant payouts for every high-energy set.'
  }
];

export const AppExperience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % appScreens.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Slideshow */}
          <div className="relative aspect-[9/16] max-w-[320px] mx-auto lg:mx-0 order-2 lg:order-1">
             {/* Device Frame Placeholder Shadow */}
             <div className="absolute inset-0 bg-[#7C3AED]/20 rounded-[3rem] blur-[60px] -z-10" />
             
             <div className="relative h-full w-full rounded-[2.5rem] border-[8px] border-[#1A1A1A] bg-[#0E0E0E] overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {/* Demo Image Label (since real images are placeholders) */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-8 text-center z-10">
                       <Smartphone className="w-12 h-12 text-[#D4AF37] mb-4 opacity-20" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                         {appScreens[currentIndex].title}
                       </span>
                    </div>
                    
                    {/* The Image (Placeholder background for now) */}
                    <div className="w-full h-full bg-gradient-to-b from-[#131313] to-[#0E0E0E]" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Status Bar Mock */}
                <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-8 z-20">
                   <span className="text-[10px] font-bold text-white/40">9:41</span>
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-white/20" />
                      <div className="w-3 h-3 rounded-full border border-white/20" />
                   </div>
                </div>

                {/* Navigation Mock */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-black/40 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4 z-20">
                   {[Home, Globe, Zap, Star].map((Icon, i) => (
                      <div key={i} className={`w-8 h-8 flex items-center justify-center ${i === 2 ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                         <div className="w-4 h-4 rounded-sm border-[1.5px] border-current" />
                      </div>
                   ))}
                </div>
             </div>

             {/* Indicators */}
             <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {appScreens.map((_, i) => (
                   <div 
                    key={i} 
                    className={`w-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'h-8 bg-[#7C3AED]' : 'h-2 bg-white/10'}`} 
                   />
                ))}
             </div>
          </div>

          {/* Right: Info */}
          <div className="order-1 lg:order-2 space-y-12">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">
                  <Smartphone className="w-3 h-3" />
                  Mobile Terminal
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase italic">
                  Take the Stage<br />
                  <span className="text-[#D4AF37] not-italic">To Go.</span>
                </h2>
                <p className="text-white/40 text-sm font-bold uppercase tracking-tight max-w-lg leading-relaxed">
                  The OcassionOrbit App is your portable command center. Manage your energy, track your global trajectory, and connect with audiences in real-time—whenever, wherever.
                </p>
             </motion.div>

             <div className="space-y-8">
                {appFeatures.map((feature, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                   >
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                        <feature.icon className="w-5 h-5 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-white font-black uppercase text-xs tracking-widest">{feature.title}</h4>
                         <p className="text-white/20 text-xs font-bold leading-relaxed">{feature.description}</p>
                      </div>
                   </motion.div>
                ))}
             </div>

             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="flex gap-4 pt-4"
             >
                <div className="h-14 w-40 rounded-xl border border-white/10 flex items-center justify-center gap-3 glass hover:bg-white/5 transition-all cursor-pointer">
                   <div className="w-6 h-6 rounded bg-white/10" />
                   <div className="flex flex-col">
                      <span className="text-[8px] text-white/40 font-black uppercase leading-none">Download on</span>
                      <span className="text-xs text-white font-bold leading-none mt-1">App Store</span>
                   </div>
                </div>
                <div className="h-14 w-40 rounded-xl border border-white/10 flex items-center justify-center gap-3 glass hover:bg-white/5 transition-all cursor-pointer">
                   <div className="w-6 h-6 rounded bg-white/10" />
                   <div className="flex flex-col">
                      <span className="text-[8px] text-white/40 font-black uppercase leading-none">Get it on</span>
                      <span className="text-xs text-white font-bold leading-none mt-1">Google Play</span>
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
