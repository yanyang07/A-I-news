import React from 'react';
import { TrendingUp } from 'lucide-react';
interface TrendScoreProps {
  score: number;
  explanation: string;
}
export function TrendScore({ score, explanation }: TrendScoreProps) {
  return (
    <div className="bg-violet-50/60 border border-violet-100 rounded-xl p-6 flex flex-col justify-center h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent opacity-50" />

      <div className="flex items-center gap-2 mb-4 text-violet-700 text-sm font-medium uppercase tracking-wider">
        <TrendingUp className="w-5 h-5 text-violet-500" />
        <span>Trend Intensity</span>
      </div>

      <p className="text-zinc-800 text-sm leading-relaxed">{explanation}</p>
    </div>);

}