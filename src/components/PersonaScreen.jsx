import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAS } from '../data';
import { Cpu } from 'lucide-react';

const containerVariants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15
      }
   }
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function PersonaScreen({ onSelect }) {
   const [hovered, setHovered] = useState(null);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.4 }}
         className="flex flex-col flex-1 px-6 py-10 overflow-y-auto"
      >
         {/* Header */}
         <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-slate-400 mb-4">
               Phase 1 of 3
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3 glow-text">
               Choose Your Predictor
            </h2>
         </div>

         {/* Explanation */}
         <div className="glass-panel rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
            <Cpu className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-xs leading-relaxed">
               Each predictor uses a different method to analyze your behavior.
               Choose who will attempt to predict your decision. This choice
               affects how you are studied — and what the system says to you.
            </p>
         </div>

         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
         >
            {Object.values(PERSONAS).map((p) => {
               const isHovered = hovered === p.id;

               return (
                  <motion.button
                     key={p.id}
                     variants={itemVariants}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onHoverStart={() => setHovered(p.id)}
                     onHoverEnd={() => setHovered(null)}
                     onClick={() => onSelect(p.id)}
                     className="relative w-full text-left rounded-3xl overflow-hidden group transition-all duration-300"
                     style={isHovered ? { boxShadow: `0 0 30px ${p.glowColor}` } : {}}
                  >
                     {/* Dynamic Glow Background */}
                     <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(120% 100% at 50% 0%, ${p.glowColor} 0%, transparent 100%)` }}
                     />

                     <div className={`relative glass-panel p-6 border transition-colors duration-300 ${isHovered ? p.borderColor : 'border-white/10'}`}>
                        <div className="flex items-start gap-4">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${p.bgColor} border ${p.borderColor}`}>
                              {p.emoji}
                           </div>
                           <div>
                              <h3 className={`text-lg font-bold mb-0.5 ${isHovered ? p.textColor : 'text-white'} transition-colors`}>
                                 {p.name}
                              </h3>
                              <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${p.textColor}`}>
                                 {p.tagline}
                              </p>
                              <p className="text-slate-400 text-xs leading-relaxed">
                                 {p.desc}
                              </p>
                           </div>
                        </div>
                     </div>
                  </motion.button>
               );
            })}
         </motion.div>
      </motion.div>
   );
}
