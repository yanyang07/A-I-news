import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem } from '../data/mockData';
import { TagPill, TagCategory } from './TagPill';

interface NewsCardProps {
  item: NewsItem;
}

const TAGS_PER_TYPE = 2;

function TagRow({
  tags,
  category,
}: {
  tags: string[];
  category: TagCategory;
}) {
  const [expanded, setExpanded] = useState(false);

  if (tags.length === 0) return null;

  const visible = expanded ? tags : tags.slice(0, TAGS_PER_TYPE);
  const hidden = tags.length - TAGS_PER_TYPE;

  return (
    <>
      {visible.map((tag) => (
        <TagPill key={tag} label={tag} category={category} size="sm" />
      ))}
      {!expanded && hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-0.5 text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-0.5 rounded-full border border-gray-200 hover:border-gray-300"
        >
          +{hidden}
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
      )}
      {expanded && tags.length > TAGS_PER_TYPE && (
        <button
          onClick={() => setExpanded(false)}
          className="flex items-center gap-0.5 text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-0.5 rounded-full border border-gray-200 hover:border-gray-300"
        >
          收起
          <ChevronUp className="w-2.5 h-2.5" />
        </button>
      )}
    </>
  );
}

export function NewsCard({ item }: NewsCardProps) {
  const primaryLink = item.sourceLinks?.[0] ?? null;

  const getSiteColor = (site: string) => {
    if (site === 'twitter') return 'text-sky-700 bg-sky-50 border-sky-200';
    if (site === 'reddit') return 'text-orange-700 bg-orange-50 border-orange-200';
    if (site === 'discord') return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    if (site.includes('Anthropic')) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (site.includes('OpenAI')) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (site.includes('Google')) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (site.includes('Meta')) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    return 'text-zinc-600 bg-zinc-50 border-zinc-200';
  };

  const hasTags =
    item.tags.technology.length > 0 ||
    item.tags.company.length > 0 ||
    item.tags.people.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5">
        {/* Header: Site & Date */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${getSiteColor(item.site)}`}
          >
            {item.site}
          </span>
          <span className="text-xs font-mono text-zinc-400">
            {item.publishedDate.split(' ')[1] || item.publishedDate}
          </span>
        </div>

        {/* Title */}
        {primaryLink ? (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg font-bold text-zinc-900 mb-2 leading-snug group-hover:text-cyan-600 transition-colors"
          >
            <span className="flex items-start gap-2">
              <span>{item.title}</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-zinc-400" />
            </span>
          </a>
        ) : (
          <h3 className="text-lg font-bold text-zinc-900 mb-2 leading-snug">
            {item.title}
          </h3>
        )}

        {/* Summary */}
        {item.summary && (
          <p className="text-sm text-zinc-700 leading-relaxed mb-4">
            {item.summary.length > 150 ? item.summary.slice(0, 150) + '…' : item.summary}
          </p>
        )}

        {/* AI Insight */}
        {item.aiGeneratedInsight && (
          <p className="text-xs text-zinc-500 italic leading-relaxed mb-4 border-l-2 border-cyan-200 pl-3">
            {item.aiGeneratedInsight}
          </p>
        )}

        {/* Tags — max 2 per type, expandable */}
        {hasTags && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            <TagRow tags={item.tags.technology} category="technology" />
            <TagRow tags={item.tags.company} category="company" />
            <TagRow tags={item.tags.people} category="people" />
          </div>
        )}

        {/* Extra source links */}
        {item.sourceLinks && item.sourceLinks.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.sourceLinks.slice(1).map((link, i) => {
              try {
                return (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-zinc-400 hover:text-cyan-600 transition-colors underline underline-offset-2 truncate max-w-[220px]"
                  >
                    {new URL(link).hostname}
                  </a>
                );
              } catch {
                return null;
              }
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
