import React from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
interface Keyword {
  keyword: string;
  rank: number;
}
interface TrendKeywordsProps {
  keywords: Keyword[];
}
export function TrendKeywords({ keywords }: TrendKeywordsProps) {
  return (
    <div className="w-full overflow-hidden py-2">
      <div className="flex items-center gap-2 mb-3 px-1">
        <Hash className="w-4 h-4 text-zinc-500" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          Top Keywords
        </span>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-gradient-right">
        {keywords.map((item, index) =>
        <motion.div
          key={item.keyword}
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: index * 0.05
          }}
          className={`
              flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium whitespace-nowrap
              ${index < 3 ? 'bg-cyan-950/20 border-cyan-900/50 text-cyan-200' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'}
            `}>

            <span
            className={`
              font-mono text-xs 
              ${index < 3 ? 'text-cyan-500' : 'text-zinc-600'}
            `}>

              {item.rank.toString().padStart(2, '0')}
            </span>
            <span>{item.keyword}</span>
          </motion.div>
        )}
      </div>
    </div>);

}