import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Network, Fingerprint, Activity, TrendingUp } from 'lucide-react';
import { PERSONAS } from '../data';

const ANALYSIS_PHASES = [
   { text: 'Parsing behavioral response patterns...', duration: 1200 },
   { text: 'Cross-referencing with historical subject data...', duration: 1200 },
   { text: 'Computing predictive confidence interval...', duration: 1600 },
];

export default function PredictionFlow({ persona, answers, onAnalysisComplete }) {
   const p = PERSONAS[persona];
   const [progress, setProgress] = useState(0);
   const [phaseIndex, setPhaseIndex] = useState(0);
   const [showPrediction, setShowPrediction] = useState(false);

   // Derive the prediction from quiz answers
   const twoBoxerCount = answers.filter(a => a === true).length;
   const predictedTwoBoxer = twoBoxerCount >= 2;
   const confidence = predictedTwoBoxer ? 82 : 91;

   const stableComplete = useCallback(onAnalysisComplete, []);

   useEffect(() => {
      const duration = 4000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
         currentStep++;
         const p = (currentStep / steps) * 100;
         setProgress(p);

         // Phase progression
         if (p > 30 && phaseIndex < 1) setPhaseIndex(1);
         if (p > 60 && phaseIndex < 2) setPhaseIndex(2);

         if (currentStep >= steps) {
            clearInterval(timer);
            // Show prediction reveal for 2.5 seconds before advancing
            setShowPrediction(true);
            setTimeout(stableComplete, 2500);
         }
      }, interval);

      return () => clearInterval(timer);
   }, [stableComplete]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, scale: 1.05 }}
         transition={{ duration: 0.5 }}
         className="flex flex-col flex-1 px-6 py-10 justify-center relative overflow-hidden"
      >
         {/* Scanning Line Effect */}
         <div className="scanline-overlay" />

         {!showPrediction ? (
            <>
               <div className="text-center mb-8 relative z-10">
                  <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className={`w-20 h-20 mx-auto rounded-full border-t-2 border-b-2 ${p.borderColor} mb-6 flex items-center justify-center`}
                  >
                     <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                     >
                        <Activity className={`w-8 h-8 ${p.textColor}`} />
                     </motion.div>
                  </motion.div>

                  <h2 className="text-2xl font-bold text-white mb-2 glow-text">
                     Analyzing Your Profile
                  </h2>
                  <p className={`text-xs font-bold uppercase tracking-widest ${p.textColor} mb-4`}>
                     {p.name} is processing your responses
                  </p>

                  {/* Dynamic Phase Text */}
                  <motion.p
                     key={phaseIndex}
                     initial={{ opacity: 0, y: 5 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-slate-400 text-sm italic"
                  >
                     {ANALYSIS_PHASES[phaseIndex]?.text}
                  </motion.p>
               </div>

               <div className="space-y-5 relative z-10">
                  <MetricBar icon={<Fingerprint />} label="Trust Index" targetValue={predictedTwoBoxer ? 38 : 73} progress={progress} color={p.textColor} bg={p.gradientFrom} />
                  <MetricBar icon={<TrendingUp />} label="Risk Tolerance" targetValue={predictedTwoBoxer ? 71 : 45} progress={progress} color={p.textColor} bg={p.gradientFrom} />
                  <MetricBar icon={<Network />} label="Strategic Reasoning" targetValue={predictedTwoBoxer ? 84 : 62} progress={progress} color={p.textColor} bg={p.gradientFrom} />
                  <MetricBar icon={<Activity />} label="Greed Factor" targetValue={predictedTwoBoxer ? 67 : 28} progress={progress} color={p.textColor} bg={p.gradientFrom} />
               </div>
            </>
         ) : (
            /* Prediction Reveal */
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
               className="text-center relative z-10"
            >
               <div className={`glass-panel rounded-3xl p-8 border ${p.borderColor}`} style={{ boxShadow: `0 0 40px ${p.glowColor}` }}>
                  <div className={`text-xs font-bold uppercase tracking-widest ${p.textColor} mb-4`}>
                     Prediction Complete
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">
                     {p.name} predicts you will take
                  </h2>
                  <div className="text-4xl font-black text-white glow-text mb-3">
                     {predictedTwoBoxer ? 'BOTH BOXES' : 'ONLY BOX B'}
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${p.bgColor} border ${p.borderColor}`}>
                     <span className={`text-sm font-bold ${p.textColor}`}>Confidence: {confidence}%</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-4 italic">
                     The prediction has been sealed. You cannot change what was already decided.
                  </p>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
}

function MetricBar({ icon, label, targetValue, progress, color, bg }) {
   const currentVal = Math.min(targetValue, targetValue * (progress / 100));

   return (
      <div className="glass-panel p-4 rounded-2xl border-white/10">
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               {React.cloneElement(icon, { className: `w-4 h-4 ${color}` })}
               <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-xs font-mono text-white">{Math.round(currentVal)}%</span>
         </div>
         <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
            <div
               className={`h-full bg-gradient-to-r ${bg} to-white shadow-[0_0_10px_currentColor]`}
               style={{ width: `${currentVal}%`, color: 'inherit' }}
            />
         </div>
      </div>
   );
}
