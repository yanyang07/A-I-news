import React from 'react';
import { motion } from 'framer-motion';
export type TagCategory = 'technology' | 'people' | 'company' | 'platform';
interface TagPillProps {
  label: string;
  category: TagCategory;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}
export function TagPill({
  label,
  category,
  isActive = false,
  onClick,
  size = 'md'
}: TagPillProps) {
  const getColors = () => {
    switch (category) {
      case 'technology':
        return isActive ?
        'bg-cyan-100 text-cyan-700 border-cyan-300' :
        'bg-cyan-50/60 text-cyan-600/80 border-cyan-200/60 hover:border-cyan-300 hover:text-cyan-700';
      case 'people':
        return isActive ?
        'bg-amber-100 text-amber-700 border-amber-300' :
        'bg-amber-50/60 text-amber-600/80 border-amber-200/60 hover:border-amber-300 hover:text-amber-700';
      case 'company':
        return isActive ?
        'bg-violet-100 text-violet-700 border-violet-300' :
        'bg-violet-50/60 text-violet-600/80 border-violet-200/60 hover:border-violet-300 hover:text-violet-700';
      case 'platform':
        return isActive ?
        'bg-rose-100 text-rose-700 border-rose-300' :
        'bg-rose-50/60 text-rose-600/80 border-rose-200/60 hover:border-rose-300 hover:text-rose-700';
      default:
        return 'bg-gray-100 text-zinc-500 border-gray-200';
    }
  };
  const sizeClasses =
  size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1';
  return (
    <motion.button
      whileHover={{
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      onClick={onClick}
      className={`
        relative rounded-full border font-medium transition-colors duration-200
        ${getColors()}
        ${sizeClasses}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}>

      <span className="relative z-10 font-mono tracking-tight">#{label}</span>
    </motion.button>);

}