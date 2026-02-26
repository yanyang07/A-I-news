import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface HeaderProps {
  date: string;
  availableDates: string[];
  onDateChange: (date: string) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function Header({ date, availableDates, onDateChange }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/10">
            <span className="text-white font-bold text-lg leading-none">AI</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-zinc-900 font-bold text-sm tracking-tight leading-none">
              AI Daily Intelligence
            </h1>
            <span className="text-zinc-400 text-xs font-medium mt-0.5">每日AI情报</span>
          </div>
        </div>

        {/* Date dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 pointer-events-none" />
            <select
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="appearance-none bg-transparent text-zinc-300 text-xs font-mono pr-4 cursor-pointer focus:outline-none"
            >
              {availableDates.map((d) => (
                <option key={d} value={d} className="bg-zinc-900 text-zinc-200">
                  {formatDate(d)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-zinc-500 flex-shrink-0 pointer-events-none -ml-3" />
          </div>
        </div>
      </div>
    </header>
  );
}
