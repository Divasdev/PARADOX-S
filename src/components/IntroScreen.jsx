import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Box, Sparkles, Eye } from 'lucide-react';

const ruleItems = [
   {
      icon: <Box className="w-5 h-5 text-amber-400 shrink-0" />,
      title: 'Box A is transparent.',
      text: 'It contains $1,000. You can see it.',
   },
   {
      icon: <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />,
      title: 'Box B is sealed.',
      text: 'It contains either $1,000,000 or nothing.',
   },
   {
      icon: <Eye className="w-5 h-5 text-cyan-400 shrink-0" />,
      title: 'The Prediction',
      text: 'A supercomputer has already predicted your choice. If it predicted you will take only Box B, it placed $1,000,000 inside. If it predicted you will take both boxes, Box B is empty.',
   },
];

export default function IntroScreen({ onStart }) {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.6 }}
         className="flex flex-col items-center flex-1 px-6 py-10 overflow-y-auto"
      >
         {/* Brain Icon */}
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-6 relative"
         >
            <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative glass-panel p-5 rounded-full border-white/20">
               <BrainCircuit className="w-12 h-12 text-violet-400" strokeWidth={1.5} />
            </div>
         </motion.div>

         {/* Title */}
         <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold tracking-tight mb-2 glow-text text-white text-center"
         >
            The Prediction Experiment
         </motion.h1>

         <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-violet-300/80 text-xs font-bold tracking-widest uppercase mb-6"
         >
            Newcomb{"'"}s Paradox — Est. 1969
         </motion.p>

         {/* Paradox Explanation */}
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full glass-panel rounded-2xl p-5 mb-5 text-left"
         >
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
               You are about to participate in a decision-making experiment
               studied by philosophers, economists, and AI researchers for
               over 50 years. There is no correct answer.
            </p>
            <p className="text-white text-sm font-semibold leading-relaxed">
               The question is simple: Do you trust the prediction… or do you
               try to outsmart it?
            </p>
         </motion.div>

         {/* Rules */}
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full flex flex-col gap-3 mb-6"
         >
            {ruleItems.map((item, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.12 }}
                  className="glass-panel rounded-xl p-4 flex items-start gap-3 text-left"
               >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                     <h3 className="text-white text-sm font-semibold mb-0.5">{item.title}</h3>
                     <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
                  </div>
               </motion.div>
            ))}
         </motion.div>

         {/* Monitoring Note */}
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="w-full glass-panel rounded-xl p-3 flex items-start gap-3 text-left mb-6 border border-red-500/20 bg-red-500/5"
         >
            <Activity className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
               <h3 className="text-red-300 text-[10px] font-bold uppercase tracking-widest mb-1">Behavior Tracking Active</h3>
               <p className="text-slate-400 text-xs leading-relaxed">
                  Your hesitations, tab switches, and response patterns are being
                  monitored in real-time by the prediction system.
               </p>
            </div>
         </motion.div>

         {/* Start Button */}
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="w-full"
         >
            <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={onStart}
               className="w-full relative overflow-hidden rounded-2xl p-[1px] group"
            >
               <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 opacity-70 group-hover:opacity-100 transition-opacity" />
               <div className="relative glass-button w-full rounded-2xl flex items-center justify-center gap-3 py-4 bg-black/50 group-hover:bg-black/20 transition-colors">
                  <span className="font-bold text-white tracking-wide">BEGIN EXPERIMENT</span>
                  <span className="text-violet-300">→</span>
               </div>
            </motion.button>
         </motion.div>
      </motion.div>
   );
}
