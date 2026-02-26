import React, { useState } from 'react';

interface AIInsightProps {
  insight: string;
}

export function AIInsight({ insight }: AIInsightProps) {
  if (!insight) return null;

  const paragraphs = insight.split(/\n+/).filter((p) => p.trim());

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1724] to-[#0a1020] border border-cyan-900/40 shadow-lg">
      {/* Glow accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="px-6 py-5">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30">
            <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">AI Insight</span>
          <span className="ml-auto text-[10px] text-zinc-600 font-mono">战略分析</span>
        </div>

        {/* Content — all paragraphs always visible, separated by spacing */}
        <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
