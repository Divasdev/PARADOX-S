import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAS } from '../data';
import { Lock, Unlock, Sparkles, Brain } from 'lucide-react';

// Psychological archetypes based on decision
const ARCHETYPES = {
   oneBoxer: {
      title: 'The Rationalist',
      subtitle: 'Evidential Decision Theory',
      desc: "You trusted the prediction model. Your action is evidence about what kind of person you are — and because the predictor is near-perfect, choosing only Box B is strong evidence it placed the million inside. You chose the strategy that correlates with the best outcome.",
      badge: '🧠',
   },
   twoBoxer: {
      title: 'The Skeptic',
      subtitle: 'Causal Decision Theory',
      desc: "You tried to outsmart the system. Your reasoning: the prediction was already made, so your choice cannot change what is in Box B. Taking both boxes guarantees you get whatever is there plus the $1,000. Logically sound — but the predictor expected exactly this.",
      badge: '🎯',
   },
};

export default function RevealScreen({ persona, isTwoBoxer, onComplete }) {
   const p = PERSONAS[persona];
   const [step, setStep] = useState(0);

   const boxBValue = isTwoBoxer ? 0 : 1000000;
   const totalWon = isTwoBoxer ? 1000 + boxBValue : boxBValue;
   const archetype = ARCHETYPES[isTwoBoxer ? 'twoBoxer' : 'oneBoxer'];

   useEffect(() => {
      const s1 = setTimeout(() => setStep(1), 1800);
      const s2 = setTimeout(() => setStep(2), 3800);
      const s3 = setTimeout(() => setStep(3), 6000);
      const s4 = setTimeout(() => setStep(4), 9000);
      const s5 = setTimeout(() => onComplete(totalWon), 13000);

      return () => { clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4); clearTimeout(s5); };
   }, [onComplete, totalWon]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="flex flex-col items-center justify-center flex-1 px-6 text-center overflow-y-auto py-10"
      >
         <AnimatePresence mode="wait">
            {/* Step 0: Decrypting */}
            {step === 0 && (
               <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                  <Lock className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-pulse" />
                  <h2 className="text-lg font-bold text-slate-300 tracking-widest uppercase mb-2">Verifying Decision</h2>
                  <p className="text-slate-500 text-xs">You made your choice. The predictor made its prediction yesterday.</p>
               </motion.div>
            )}

            {/* Step 1: Show user's choice */}
            {step === 1 && (
               <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <div className={`w-12 h-12 rounded-full border ${p.borderColor} flex items-center justify-center mx-auto mb-4 ${p.bgColor}`}>
                     <span className="text-2xl">{p.emoji}</span>
                  </div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-bold">Your Decision</p>
                  <p className="text-white text-3xl font-extrabold">{isTwoBoxer ? 'Both Boxes' : 'Only Box B'}</p>
               </motion.div>
            )}

            {/* Step 2: Box B Opens */}
            {step === 2 && (
               <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <motion.div
                     className={`glass-panel p-8 rounded-3xl border ${p.borderColor} relative overflow-hidden w-full`}
                     style={{ boxShadow: `0 0 40px ${p.glowColor}` }}
                  >
                     <div className="absolute inset-0 bg-black/40" />
                     <div className="relative z-10">
                        <Unlock className={`w-8 h-8 ${p.textColor} mx-auto mb-3`} />
                        <div className="text-sm tracking-widest uppercase text-slate-400 font-bold mb-2">Now opening Box B...</div>
                        <div className="text-3xl font-bold text-white animate-pulse">🔓</div>
                     </div>
                  </motion.div>
               </motion.div>
            )}

            {/* Step 3: Big Money Reveal */}
            {step >= 3 && step < 4 && (
               <motion.div key="s3" className="w-full relative z-10" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
                  <motion.div
                     className={`glass-panel p-8 rounded-3xl border ${p.borderColor} relative overflow-hidden`}
                     style={{ boxShadow: `0 0 50px ${p.glowColor}` }}
                  >
                     <div className="absolute inset-0 bg-black/40" />
                     <div className="relative z-10">
                        <div className={`text-xs tracking-widest uppercase ${p.textColor} font-bold mb-3 flex items-center justify-center gap-2`}>
                           <Sparkles className="w-4 h-4" /> Result
                        </div>
                        <div className="text-6xl font-black text-white glow-text mb-2">
                           ${totalWon.toLocaleString()}
                        </div>
                        <div className="text-sm font-bold text-slate-400">
                           {isTwoBoxer ? 'Box A ($1,000) + Box B ($0)' : 'Box B ($1,000,000)'}
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6 }}
                     className="mt-6 px-2"
                  >
                     <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-white/20 pl-4 text-left">
                        "{p.winMsg(!isTwoBoxer)}"
                     </p>
                  </motion.div>
               </motion.div>
            )}

            {/* Step 4: Psychological Archetype */}
            {step >= 4 && (
               <motion.div key="s4" className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {/* Money result (compact) */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                     <span className="text-3xl font-black text-white glow-text">${totalWon.toLocaleString()}</span>
                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isTwoBoxer ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'}`}>
                        {isTwoBoxer ? 'Two-Boxer' : 'One-Boxer'}
                     </span>
                  </div>

                  {/* Archetype Card */}
                  <div className="glass-panel rounded-3xl p-6 text-left">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                           <Brain className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                           <h3 className="text-white text-lg font-bold">{archetype.title}</h3>
                           <p className={`text-[10px] font-bold uppercase tracking-widest ${p.textColor}`}>{archetype.subtitle}</p>
                        </div>
                     </div>
                     <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {archetype.desc}
                     </p>
                     <p className="text-slate-500 text-[10px] leading-relaxed italic border-t border-white/10 pt-3">
                        <strong className="text-slate-400">The real paradox:</strong> Both arguments are logically
                        coherent. Robert Nozick introduced this in 1969, and philosophers still have not
                        agreed. You are in good company.
                     </p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}
