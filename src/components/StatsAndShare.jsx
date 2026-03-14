import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAS } from '../data';
import { Share2, BarChart2, CheckCircle2, Copy, Brain, Trophy } from 'lucide-react';

export default function StatsAndShare({ stats, lastResult, onRestart }) {
   const p = PERSONAS[lastResult.persona];
   const total = stats.oneBoxCount + stats.twoBoxCount;
   const oneBoxPct = total === 0 ? 0 : Math.round((stats.oneBoxCount / total) * 100);
   const twoBoxPct = total === 0 ? 0 : 100 - oneBoxPct;

   const [copied, setCopied] = useState(false);

   const getReceiptMessage = () => {
      if (lastResult.cheatType === 'timeout') {
         return `I froze under pressure. ${p.name} auto-selected for me. I walked away with $${lastResult.winnings.toLocaleString()}.`;
      }
      if (lastResult.cheatType) {
         return `I tried to cheat the system. ${p.name} caught me and zeroed out Box B. Shame.`;
      }
      if (lastResult.winnings === 1000000) {
         return `I trusted the prediction. Took only Box B. Walked away with $1,000,000 under ${p.name}.`;
      }
      return `I took both boxes. The predictor saw it coming. $1,000 under ${p.name}. Classic Two-Boxer.`;
   };

   const handleCopy = async () => {
      const text = `
🧠 Newcomb's Paradox — Simulation Complete

Predictor: ${p.name} ${p.emoji}
Result: $${lastResult.winnings.toLocaleString()}

${getReceiptMessage()}

Are you a One-Boxer or a Two-Boxer?
Take the test → https://newcombs-paradox.app
    `.trim();

      try {
         if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
         } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
         }
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy text', err);
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-col flex-1 px-5 py-8 pb-12 overflow-y-auto"
      >
         {/* Section Header */}
         <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
               <BarChart2 className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-white">How Humanity Decides</h2>
               <p className="text-xs text-slate-400 font-mono">N={total} subjects tested</p>
            </div>
         </div>

         {/* Intro Copy */}
         <p className="text-slate-400 text-xs leading-relaxed mb-5 pl-1">
            You are not alone. Thousands of people have faced this exact
            paradox. Here is how the population splits — and what the math
            says about each strategy.
         </p>

         {/* Stats Dashboard Card */}
         <div className="glass-panel rounded-3xl p-6 mb-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Population Split</h3>

            <div className="flex items-center mb-8">
               <div className="relative w-24 h-24 shrink-0">
                  <div
                     className="absolute inset-0 rounded-full"
                     style={{
                        background: `conic-gradient(#8b5cf6 0% ${oneBoxPct}%, #f59e0b ${oneBoxPct}% 100%)`,
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
                     }}
                  />
                  <div className="absolute inset-2 bg-black rounded-full flex flex-col items-center justify-center">
                     <span className="text-white font-bold text-sm leading-none">{oneBoxPct}%</span>
                     <span className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">One</span>
                  </div>
               </div>

               <div className="flex-1 ml-6 space-y-4">
                  <div>
                     <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-300 uppercase">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-violet-500" /> One-Boxers</span>
                        <span>{oneBoxPct}%</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${oneBoxPct}%` }} />
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between items-center mb-1 text-xs font-bold text-slate-300 uppercase">
                        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> Two-Boxers</span>
                        <span>{twoBoxPct}%</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${twoBoxPct}%` }} />
                     </div>
                  </div>
               </div>
            </div>

            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Expected Value (95% Accuracy)</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                     <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">E[One-Box]</span>
                     <span className="text-[10px] text-slate-500">Trust predictor → likely $1M</span>
                  </div>
                  <span className="text-sm font-mono text-emerald-400 font-bold">$950,000</span>
               </div>
               <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                     <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">E[Two-Box]</span>
                     <span className="text-[10px] text-slate-500">Outsmart predictor → likely $1K</span>
                  </div>
                  <span className="text-sm font-mono text-emerald-400 font-bold">$51,000</span>
               </div>
               <p className="text-[10px] text-center text-slate-500 mt-2 italic">
                  If the predictor is 95% accurate, one-boxing has ~18x higher expected value.
               </p>
            </div>
         </div>

         {/* Share Receipt Card */}
         <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share Your Result
         </h3>
         <p className="text-slate-500 text-[11px] leading-relaxed mb-3 ml-2">
            Challenge your friends. Paste this in WhatsApp, Discord, or Instagram.
         </p>
         <div className="glass-panel border-white/20 p-5 rounded-3xl relative mb-8 group">
            <button
               onClick={handleCopy}
               className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-slate-300 z-10"
            >
               {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <div className="receipt-text text-slate-300 space-y-4 pr-12">
               <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 border-dashed justify-between">
                  <span className="font-bold text-white tracking-widest uppercase">Simulation.Log</span>
                  <span className="text-xs">{p.emoji}</span>
               </div>

               <div className="text-white relative">
                  <span className="text-emerald-400 mr-2">{'>'}</span>
                  {getReceiptMessage()}
               </div>

               <div className="text-slate-500 text-[9px] pt-2 border-t border-white/10 border-dashed flex justify-between">
                  <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  <span className="text-amber-500/70">Winnings: ${lastResult.winnings.toLocaleString()}</span>
               </div>
            </div>
         </div>

         <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full relative overflow-hidden rounded-2xl p-[1px] group mt-auto"
         >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative glass-button w-full rounded-2xl flex items-center justify-center gap-2 py-4 bg-black/50 group-hover:bg-black/20 transition-colors">
               <span className="font-bold text-white tracking-wide">RUN SIMULATION AGAIN</span>
               <span className="text-violet-300">↻</span>
            </div>
         </motion.button>
      </motion.div>
   );
}
