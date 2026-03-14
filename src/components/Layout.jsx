import React from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
   return (
      <div className="mobile-container">
         {/* Animated Deep Background Grid */}
         <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
         }} />

         {/* Floating Neural Orbs */}
         <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-violet-600/20 blur-[80px] pointer-events-none z-0"
         />
         <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 -right-20 w-72 h-72 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none z-0"
         />

         {/* Container Content */}
         <div className="relative z-10 flex flex-col min-h-screen">
            {children}
         </div>
      </div>
   );
}
