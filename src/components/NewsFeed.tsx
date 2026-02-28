import React from 'react';
import { NewsItem } from '../data/mockData';
import { NewsCard } from './NewsCard';

interface NewsFeedProps {
  items: NewsItem[];
}

export function NewsFeed({ items }: NewsFeedProps) {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-blue-200 rounded-xl bg-blue-50/40">
        <p className="text-zinc-400 font-mono">
          No intelligence found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
