export interface IMood {
  score: number;
  name: string;
  emoji: string;
  color: string;
}

const moodMap: Record<string, IMood> = {
  delighted: { name: "delighted", score: 2, emoji: "😁", color: "#22c55e" },
  happy: { name: "happy", score: 1, emoji: "😊", color: "#10b981" },
  neutral: { name: "neutral", score: 0, emoji: "😐", color: "#9ca3af" },
  sad: { name: "sad", score: -1, emoji: "🙁", color: "#facc15" },
  miserable: { name: "miserable", score: -2, emoji: "😭", color: "#ef4444" },
};

const scoreToMood = (score: number) => {
  return Object.values(moodMap).find(m => m.score === score);
}

export {
  moodMap,
  scoreToMood
}
