import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAS } from '../data';
import { AlertCircle, Box, Sparkles, Shield } from 'lucide-react';

const TIMER_SECONDS = 10;
const CIRCUMFERENCE = 2 * Math.PI * 40;

export default function DecisionScreen({ persona, cheatType, onDecide }) {
   const p = PERSONAS[persona];
   const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
   const [expired, setExpired] = useState(false);
   const timerRef = useRef(null);

   useEffect(() => {
      timerRef.current = setInterval(() => {
         setTimeLeft((prev) => {
            if (prev <= 1) {
               clearInterval(timerRef.current);
               setExpired(true);
               setTimeout(() => {
                  const autoChoice = Math.random() < 0.5 ? 'one-boxer' : 'two-boxer';
                  onDecide(autoChoice, true);
               }, 1500);
               return 0;
            }
            return prev - 1;
         });
      }, 1000);
      return () => clearInterval(timerRef.current);
   }, [onDecide]);

   const dashOffset = CIRCUMFERENCE * (1 - timeLeft / TIMER_SECONDS);
   const isUrgent = timeLeft <= 3 && !expired;
   const ringColor = expired ? '#ef4444' : isUrgent ? '#ef4444' : timeLeft <= 6 ? '#f59e0b' : '#10b981';

   const boxVariants = {
      normal: { x: 0, y: 0 },
      urgent: {
         x: [-2, 2, -2, 2, 0],
         y: [-1, 1, -1, 1, 0],
         transition: { duration: 0.4, repeat: Infinity, repeatType: "mirror" }
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="flex flex-col flex-1 px-5 py-6 overflow-y-auto"
      >
         {/* Cheat Alert */}
         <AnimatePresence>
            {cheatType && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex gap-3 backdrop-blur-md"
               >
                  <AlertCircle className="text-red-400 w-5 h-5 shrink-0" />
                  <div>
                     <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-tight mb-1">
                        {cheatType === 'tab' ? 'Tab Switch' : cheatType === 'resize' ? 'Window Resize' : 'DevTools'} Detected
                     </p>
                     <p className="text-xs text-red-200/80 leading-snug">{p.cheatMsg}</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Header */}
         <div className="text-center mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 ${p.textColor} mb-3`}>
               <Shield className="w-3 h-3" /> Phase 3 of 3 — Decision
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-2 glow-text">The Moment of Truth</h2>
         </div>

         {/* Situation Recap */}
         <div className="glass-panel rounded-xl p-4 mb-5 text-left">
            <p className="text-slate-300 text-xs leading-relaxed mb-2">
               The boxes are now in front of you. <strong className="text-white">{p.name}</strong> has
               already made a prediction — yesterday. You cannot change what the predictor decided.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed italic">
               You can only choose what to do now. If the predictor is accurate,
               one choice may cost you a million dollars.
            </p>
         </div>

         {/* Timer SVG */}
         <div className="flex justify-center mb-5">
            <div className="relative w-24 h-24">
               <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <motion.circle
                     cx="50" cy="50" r="40" fill="none"
                     stroke={ringColor}
                     strokeWidth="6"
                     strokeLinecap="round"
                     strokeDasharray={CIRCUMFERENCE}
                     animate={{ strokeDashoffset: dashOffset }}
                     transition={{ duration: 1, ease: "linear" }}
                     style={{ filter: `drop-shadow(0 0 8px ${ringColor})` }}
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {expired ? (
                     <span className="text-red-400 text-sm font-bold animate-pulse tracking-wide">TIME</span>
                  ) : (
                     <span className={`text-3xl font-extrabold leading-none ${isUrgent ? 'text-red-400' : 'text-white'}`}>{timeLeft}</span>
                  )}
               </div>
            </div>
         </div>

         {/* Boxes Container */}
         <div className="flex gap-4 mb-5">
            {/* Box A */}
            <motion.div
               variants={boxVariants}
               animate={isUrgent ? "urgent" : "normal"}
               className="flex-1 glass-panel border border-amber-500/30 bg-gradient-to-b from-amber-900/40 to-black/40 rounded-3xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden"
               style={{ boxShadow: 'inset 0 0 20px rgba(245,158,11,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}
            >
               <span className="absolute top-2 right-2 text-[7px] font-bold text-amber-500 tracking-widest uppercase">Visible</span>
               <Box className="w-8 h-8 text-amber-500/80 mb-1" />
               <div className="font-bold text-amber-400 text-xs mb-0.5">Box A</div>
               <div className="text-xl font-extrabold text-white">$1,000</div>
               <div className="text-[9px] text-amber-500/60 mt-1">Guaranteed</div>
            </motion.div>

            {/* Box B */}
            <motion.div
               variants={boxVariants}
               animate={isUrgent ? "urgent" : "normal"}
               className="flex-1 glass-panel border border-violet-500/40 bg-gradient-to-b from-violet-900/40 to-black/40 rounded-3xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden"
               style={{ boxShadow: 'inset 0 0 20px rgba(139,92,246,0.15), 0 10px 30px rgba(0,0,0,0.5)' }}
            >
               <span className="absolute top-2 right-2 text-[7px] font-bold text-violet-400 tracking-widest uppercase">Sealed</span>
               <Sparkles className="w-8 h-8 text-violet-400/80 mb-1" />
               <div className="font-bold text-violet-300 text-xs mb-0.5">Box B</div>
               <div className="text-xl font-extrabold text-white">???</div>
               <div className="text-[9px] text-violet-400/60 mt-1">$0 or $1,000,000</div>
            </motion.div>
         </div>

         {/* Action Buttons */}
         <AnimatePresence>
            {!expired && (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-3 mt-auto"
               >
                  <motion.button
                     whileTap={{ scale: 0.97 }}
                     onClick={() => { clearInterval(timerRef.current); onDecide('one-boxer', false); }}
                     className="w-full relative overflow-hidden rounded-2xl p-[1px] group"
                  >
                     <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                     <div className="relative w-full rounded-2xl flex flex-col items-center justify-center py-4 bg-black/80 backdrop-blur-md">
                        <span className="font-bold text-white text-base">Take ONLY Box B</span>
                        <span className="text-[10px] text-violet-300 uppercase tracking-widest font-semibold mt-0.5">Trust the prediction</span>
                     </div>
                  </motion.button>

                  <motion.button
                     whileTap={{ scale: 0.97 }}
                     onClick={() => { clearInterval(timerRef.current); onDecide('two-boxer', false); }}
                     className="w-full relative overflow-hidden rounded-2xl p-[1px] group"
                  >
                     <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 opacity-40 group-hover:opacity-80 transition-opacity" />
                     <div className="relative w-full rounded-2xl flex flex-col items-center justify-center py-4 bg-black/80 backdrop-blur-md">
                        <span className="font-bold text-white text-base">Take BOTH Boxes</span>
                        <span className="text-[10px] text-amber-300/80 uppercase tracking-widest font-semibold mt-0.5">Outsmart the predictor</span>
                     </div>
                  </motion.button>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}
