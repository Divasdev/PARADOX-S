export const PERSONAS = {
   heisenberg: {
      id: 'heisenberg',
      name: 'The Heisenberg',
      emoji: '🧪',
      tagline: 'I am the one who knocks.',
      desc: 'A ruthless strategist who believes every human decision can be calculated. He sees your weakness before you feel it.',
      accent: 'emerald',
      gradientFrom: 'from-emerald-600',
      gradientTo: 'to-teal-600',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      quizIntro: "Before we begin, I need to understand what you are made of. Answer carefully — every data point matters.",
      decisionIntro: "The equation is simple. I have already calculated your next move. The prediction was sealed before you sat down.",
      cheatMsg: "Anomaly logged. You hesitated. In my world, hesitation is a confession. Box B has been emptied.",
      winMsg: (won) => won
         ? "You chose wisely. Even I respect a clean play. $1,000,000. Enjoy it while it lasts."
         : "Exactly what I predicted. You tried to outsmart the chemistry, but the chemistry always wins.",
   },
   ceo: {
      id: 'ceo',
      name: 'The Tech CEO',
      emoji: '🚀',
      tagline: 'Move fast. Break paradigms.',
      desc: 'A chaotic AI trained on billions of behavioral data points. It predicts human irrationality at scale — and it is rarely wrong.',
      accent: 'cyan',
      gradientFrom: 'from-cyan-600',
      gradientTo: 'to-blue-600',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      quizIntro: "Our AI has processed 50,000 subjects with 99.97% accuracy. You are subject #50,001. Let us run the analysis.",
      decisionIntro: "The model is locked. The prediction was uploaded to our servers 3 minutes ago. You cannot change what has already been computed.",
      cheatMsg: "Behavior flagged by our fraud-detection pipeline. Box B has been set to $0. We see everything.",
      winMsg: (won) => won
         ? "Impressive. Our model had this at 73% confidence. You were in the top percentile. We will be watching you."
         : "Our AI nailed it. Classic Two-Boxer profile. We have seen 50,000 of you this quarter alone. Box B was $0.",
   },
   oracle: {
      id: 'oracle',
      name: 'The Oracle',
      emoji: '🔮',
      tagline: 'The future is already written.',
      desc: 'An ancient intelligence that sees human intentions before they become actions. It has watched ten thousand versions of you.',
      accent: 'amber',
      gradientFrom: 'from-amber-600',
      gradientTo: 'to-orange-600',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      quizIntro: "I have watched ten thousand timelines that lead to this moment. Answer truthfully. I already know what you will say.",
      decisionIntro: "The prophecy is sealed in starlight. What you choose has always been chosen. The only question is whether you accept it.",
      cheatMsg: "Your soul flickered. I felt the moment you looked away. The stars have already spoken. Box B holds nothing.",
      winMsg: (won) => won
         ? "It was written. You trusted the cosmos, and the cosmos rewarded your faith. $1,000,000."
         : "Even in this timeline, it was always so. Your path was never going to lead to the million. The stars do not lie.",
   },
}

export const QUESTIONS = [
   {
      id: 1,
      context: "The predictor studies how you think about agency and control.",
      text: 'Do you believe in free will, or is the universe deterministic?',
      interpretation: {
         true: "Interesting. You believe your choices are genuinely your own. The predictor notes a pattern of independence.",
         false: "You see the universe as a system of causes and effects. The predictor finds this... predictable.",
      },
      options: [
         { label: 'A', text: 'Free Will — my choices are genuinely my own', twoBoxer: true },
         { label: 'B', text: 'Deterministic — outcomes are pre-written by prior causes', twoBoxer: false },
      ],
   },
   {
      id: 2,
      context: "This question helps the system measure your trust in others versus your need for control.",
      text: "In a group project, what is your instinct?",
      interpretation: {
         true: "You default to trust. The system registers a higher willingness to cooperate under uncertainty.",
         false: "You prefer control. The predictor adjusts its confidence interval upward.",
      },
      options: [
         { label: 'A', text: 'Trust the team — let each member own their part', twoBoxer: true },
         { label: 'B', text: 'Take over — ensure it gets done right, yourself', twoBoxer: false },
      ],
   },
   {
      id: 3,
      context: "This final question reveals whether you think statistically or emotionally.",
      text: "A coin lands heads 10 times in a row. What is the next flip?",
      interpretation: {
         true: "You fell for the gambler's fallacy. The predictor notes an emotional reasoning pattern.",
         false: "Correct. Each flip is independent. The predictor registers rational, probabilistic thinking.",
      },
      options: [
         { label: 'A', text: "Tails — it is due for a change", twoBoxer: true },
         { label: 'B', text: '50 / 50 — every flip is an independent event', twoBoxer: false },
      ],
   },
]
