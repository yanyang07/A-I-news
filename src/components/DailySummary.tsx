import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
interface DailySummaryProps {
  summary: string;
}
export function DailySummary({ summary }: DailySummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = summary.split('\n\n').filter((s) => s.trim().length > 0);
  return (
    <div className="bg-blue-50/60 border border-blue-100 rounded-xl overflow-hidden">
      <div className="p-6">
        <AnimatePresence initial={false}>
          {(isExpanded || window.innerWidth >= 768) &&
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.3
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {categories.map((section, idx) => {
              const [title, ...content] = section.split('：');
              const cleanTitle = title.replace(/\*\*/g, '');
              const cleanContent = content.join('：');
              let dotColor = 'bg-zinc-400';
              if (cleanTitle.includes('技术')) dotColor = 'bg-cyan-500';
              if (cleanTitle.includes('公司')) dotColor = 'bg-violet-500';
              if (cleanTitle.includes('资本')) dotColor = 'bg-emerald-500';
              if (cleanTitle.includes('人物')) dotColor = 'bg-amber-500';
              return (
                <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                      <h4 className="text-zinc-800 font-medium text-sm">
                        {cleanTitle}
                      </h4>
                    </div>
                    <p className="text-zinc-700 text-sm leading-relaxed pl-4">
                      {cleanContent}
                    </p>
                  </div>);

            })}
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Mobile Expand Button */}
      <div className="md:hidden border-t border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex items-center justify-center gap-2 text-xs text-zinc-400 hover:text-zinc-600 hover:bg-blue-100/50 transition-colors">

          {isExpanded ?
          <>
              <span>收起</span>
              <ChevronUp className="w-3 h-3" />
            </> :

          <>
              <span>展开完整分析</span>
              <ChevronDown className="w-3 h-3" />
            </>
          }
        </button>
      </div>
    </div>);

}