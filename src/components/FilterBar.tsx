import React, { useMemo, useState } from 'react';
import { TagPill, TagCategory } from './TagPill';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterBarProps {
  allTags: {
    technology: string[];
    company: string[];
    people: string[];
  };
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

const MAX_VISIBLE = 16;

export function FilterBar({ allTags, activeTags, onToggleTag, onClear }: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  // Merge into a flat deduped list, preserving category for colour coding
  const flatTags = useMemo(() => {
    const seen = new Set<string>();
    const result: { label: string; category: TagCategory }[] = [];
    const add = (tags: string[], cat: TagCategory) => {
      tags.forEach((t) => {
        if (!seen.has(t)) {
          seen.add(t);
          result.push({ label: t, category: cat });
        }
      });
    };
    add(allTags.technology, 'technology');
    add(allTags.company, 'company');
    add(allTags.people, 'people');
    return result;
  }, [allTags]);

  const hasActiveFilters = activeTags.length > 0;
  const needsExpand = flatTags.length > MAX_VISIBLE;
  const visibleTags = expanded ? flatTags : flatTags.slice(0, MAX_VISIBLE);
  const hiddenCount = flatTags.length - MAX_VISIBLE;

  if (flatTags.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {visibleTags.map(({ label, category }) => (
          <TagPill
            key={label}
            label={label}
            category={category}
            isActive={activeTags.includes(label)}
            onClick={() => onToggleTag(label)}
          />
        ))}

        {needsExpand && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-1 rounded-full border border-gray-200 hover:border-gray-400"
          >
            {expanded ? (
              <>
                <span>收起</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>+{hiddenCount} more</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
