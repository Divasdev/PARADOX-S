import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useStats, useCheatDetector } from './hooks';

import Layout from './components/Layout';
import IntroScreen from './components/IntroScreen';
import PersonaScreen from './components/PersonaScreen';
import QuizScreen from './components/QuizScreen';
import PredictionFlow from './components/PredictionFlow';
import DecisionScreen from './components/DecisionScreen';
import RevealScreen from './components/RevealScreen';
import StatsAndShare from './components/StatsAndShare';

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [persona, setPersona] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null); // { persona, cheatType, isTwoBoxer, winnings }

  const { stats, recordPlay } = useStats();
  const isVigilant = screen === 'quiz' || screen === 'decision';
  const cheatTrigger = useCheatDetector(isVigilant);

  const startExperiment = () => setScreen('persona');

  const selectPersona = (pId) => {
    setPersona(pId);
    setScreen('quiz');
  };

  const completeQuiz = (ans) => {
    setAnswers(ans);
    setScreen('prediction'); // New UX flow step
  };

  const finishPrediction = () => {
    setScreen('decision');
  };

  const makeDecision = (choice, timedOut = false) => {
    // Determine user's logic-based choice
    let isTwoBoxer = choice === 'two-boxer';
    const isCheater = !!cheatTrigger;

    // Hard punishment for cheaters: they are forced into a Two-Box outcome by the predictor
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top for mobile transitions

    setResult({
      persona,
      cheatType: isCheater ? cheatTrigger : (timedOut ? 'timeout' : null),
      isTwoBoxer: isCheater ? true : isTwoBoxer,
      winnings: 0 // calculated in Reveal overlay
    });

    // Record legitimate plays
    if (!isCheater && !timedOut) {
      recordPlay(isTwoBoxer);
    }

    setScreen('reveal');
  };

  const handleRevealComplete = (winnings) => {
    setResult(prev => ({ ...prev, winnings }));
    setScreen('stats');
  };

  const restart = () => {
    setScreen('persona');
    setAnswers([]);
    setResult(null);
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <IntroScreen key="intro" onStart={startExperiment} />
        )}

        {screen === 'persona' && (
          <PersonaScreen key="persona" onSelect={selectPersona} />
        )}

        {screen === 'quiz' && (
          <QuizScreen key="quiz" persona={persona} onComplete={completeQuiz} />
        )}

        {screen === 'prediction' && (
          <PredictionFlow key="prediction" persona={persona} answers={answers} onAnalysisComplete={finishPrediction} />
        )}

        {screen === 'decision' && (
          <DecisionScreen key="decision" persona={persona} cheatType={cheatTrigger} onDecide={makeDecision} />
        )}

        {screen === 'reveal' && (
          <RevealScreen key="reveal" persona={result.persona} isTwoBoxer={result.isTwoBoxer} onComplete={handleRevealComplete} />
        )}

        {screen === 'stats' && (
          <StatsAndShare key="stats" stats={stats} lastResult={result} onRestart={restart} />
        )}
      </AnimatePresence>
    </Layout>
  );
}
