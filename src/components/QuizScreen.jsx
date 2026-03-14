import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, PERSONAS } from '../data';
import { ScanEye } from 'lucide-react';

export default function QuizScreen({ persona, onComplete }) {
   const p = PERSONAS[persona];
   const [current, setCurrent] = useState(0);
   const [answers, setAnswers] = useState([]);
   const [selected, setSelected] = useState(null);
   const [showInterpretation, setShowInterpretation] = useState(false);

   const question = QUESTIONS[current];
   const progress = ((current + 1) / QUESTIONS.length) * 100;

   function handleSelect(isTwoBoxer) {
      if (selected !== null) return;
      setSelected(isTwoBoxer);
      // Show interpretation after a brief delay
      setTimeout(() => setShowInterpretation(true), 400);
   }

   function handleNext() {
      if (selected === null) return;

      const newAnswers = [...answers, selected];
      if (current + 1 < QUESTIONS.length) {
         setAnswers(newAnswers);
         setSelected(null);
         setShowInterpretation(false);
         setCurrent(current + 1);
      } else {
         onComplete(newAnswers);
      }
   }

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="flex flex-col flex-1 px-5 py-8"
      >
         {/* HUD Header */}
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                  {p.emoji}
               </div>
               <div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${p.textColor}`}>Analyzing...</div>
                  <div className="text-white text-xs font-semibold">{p.name}</div>
               </div>
            </div>
            <div className="text-right">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Phase 2 of 3</div>
               <div className={`text-sm font-bold ${p.textColor}`}>{current + 1} / {QUESTIONS.length}</div>
            </div>
         </div>

         {/* Progress Bar */}
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
            <motion.div
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               className={`h-full bg-gradient-to-r ${p.gradientFrom} ${p.gradientTo}`}
            />
         </div>

         {/* Persona Quote */}
         {current === 0 && (
            <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-panel rounded-xl p-3 mb-6 flex items-start gap-3 text-left border border-white/10"
            >
               <ScanEye className={`w-4 h-4 ${p.textColor} shrink-0 mt-0.5`} />
               <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{p.quizIntro}"
               </p>
            </motion.div>
         )}

         {/* Main Question Area */}
         <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
               <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col w-full"
               >
                  {/* Question Context */}
                  <p className="text-slate-500 text-[11px] leading-snug mb-3 uppercase tracking-wide font-semibold">
                     {question.context}
                  </p>

                  <div className="mb-6">
                     <h2 className="text-xl font-bold text-white leading-snug">
                        {question.text}
                     </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                     {question.options.map((opt) => {
                        const isSelected = selected === opt.twoBoxer;
                        return (
                           <motion.button
                              key={opt.label}
                              whileHover={selected === null ? { scale: 1.02 } : {}}
                              whileTap={selected === null ? { scale: 0.98 } : {}}
                              onClick={() => handleSelect(opt.twoBoxer)}
                              className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300
                      ${isSelected
                                    ? `${p.borderColor} ${p.bgColor} text-white`
                                    : selected !== null
                                       ? 'border-white/5 bg-white/[0.02] text-slate-500'
                                       : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                                 }`}
                              style={isSelected ? { boxShadow: `0 0 20px ${p.glowColor}` } : {}}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                        ${isSelected ? `bg-gradient-to-br ${p.gradientFrom} ${p.gradientTo} text-white` : 'bg-black/40 text-slate-400 border border-white/10'}`}>
                                    {opt.label}
                                 </div>
                                 <span className="text-sm font-medium leading-tight">{opt.text}</span>
                              </div>
                           </motion.button>
                        );
                     })}
                  </div>

                  {/* AI Interpretation Feedback */}
                  <AnimatePresence>
                     {showInterpretation && selected !== null && (
                        <motion.div
                           initial={{ opacity: 0, y: 10, height: 0 }}
                           animate={{ opacity: 1, y: 0, height: 'auto' }}
                           exit={{ opacity: 0, y: 10, height: 0 }}
                           transition={{ duration: 0.4 }}
                           className="mt-5 glass-panel rounded-xl p-4 border border-white/10 flex items-start gap-3 text-left"
                        >
                           <ScanEye className={`w-4 h-4 ${p.textColor} shrink-0 mt-0.5`} />
                           <p className={`text-xs leading-relaxed ${p.textColor}`}>
                              {question.interpretation[String(selected)]}
                           </p>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Next Button Footer */}
         <div className="mt-6 pt-4">
            <AnimatePresence>
               {showInterpretation && selected !== null && (
                  <motion.button
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     whileTap={{ scale: 0.96 }}
                     onClick={handleNext}
                     className={`w-full py-4 rounded-full font-bold text-white shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r ${p.gradientFrom} ${p.gradientTo}`}
                     style={{ boxShadow: `0 8px 30px ${p.glowColor}` }}
                  >
                     {current + 1 === QUESTIONS.length ? 'Submit for Analysis' : 'Continue'}
                     <span>→</span>
                  </motion.button>
               )}
            </AnimatePresence>
         </div>
      </motion.div>
   );
}
