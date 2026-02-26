import React from 'react';
import { motion } from 'framer-motion';
interface DailyHeadlineProps {
  headline: string;
}
export function DailyHeadline({ headline }: DailyHeadlineProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6
      }}
      className="relative pl-5 md:pl-6 py-1">

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-600 rounded-full" />
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-zinc-900 leading-snug tracking-tight">
        {headline}
      </h2>
    </motion.div>);

}