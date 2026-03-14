import { useState, useEffect } from 'react';

// Feature 1: Cheat Detection Hook
export function useCheatDetector(isActive) {
   const [cheatType, setCheatType] = useState(null);

   useEffect(() => {
      if (!isActive) return;

      // 1. Tab Switching
      const handleVisibility = () => {
         if (document.visibilityState === 'hidden') setCheatType('tab');
      };

      // 2. Window Resizing
      const handleResize = () => setCheatType('resize');

      // 3. DevTools (basic width/height discrepancy heuristic)
      const handleDevTools = () => {
         const threshold = 160;
         if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
         ) {
            setCheatType('devtools');
         }
      };

      document.addEventListener('visibilitychange', handleVisibility);
      window.addEventListener('resize', handleResize);
      window.addEventListener('resize', handleDevTools); // triggers on devtools dock

      // Polling for devtools if undocked
      const devToolsInterval = setInterval(handleDevTools, 1000);

      return () => {
         document.removeEventListener('visibilitychange', handleVisibility);
         window.removeEventListener('resize', handleResize);
         window.removeEventListener('resize', handleDevTools);
         clearInterval(devToolsInterval);
      };
   }, [isActive]);

   return cheatType;
}

// Feature 2: Stats Hook
export function useStats() {
   const [stats, setStats] = useState({ oneBoxCount: 0, twoBoxCount: 0 });

   useEffect(() => {
      const saved = localStorage.getItem('newcomb_stats');
      if (saved) {
         setStats(JSON.parse(saved));
      } else {
         // Seed with some initial realistic data to make the pie chart look good instantly
         const seed = { oneBoxCount: 840, twoBoxCount: 312 };
         setStats(seed);
         localStorage.setItem('newcomb_stats', JSON.stringify(seed));
      }
   }, []);

   const recordPlay = (isTwoBoxer) => {
      const newStats = {
         ...stats,
         oneBoxCount: stats.oneBoxCount + (isTwoBoxer ? 0 : 1),
         twoBoxCount: stats.twoBoxCount + (isTwoBoxer ? 1 : 0),
      };
      setStats(newStats);
      localStorage.setItem('newcomb_stats', JSON.stringify(newStats));
   };

   return { stats, recordPlay };
}
