import React, { useEffect, useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { DailyData } from './data/mockData';
import { fetchAvailableDates, fetchDailyData } from './services/dataService';
import { Header } from './components/Header';
import { DailyHeadline } from './components/DailyHeadline';
import { AIInsight } from './components/AIInsight';
import { FilterBar } from './components/FilterBar';
import { NewsFeed } from './components/NewsFeed';
import { PlatformSidebar } from './components/PlatformSidebar';
import { exportToPdf } from './utils/exportPdf';

export function App() {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);

  // Load available dates on mount
  useEffect(() => {
    fetchAvailableDates().then((dates) => {
      setAvailableDates(dates);
      if (dates.length > 0) setSelectedDate(dates[0]);
    });
  }, []);

  // Load data whenever selected date changes
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setActiveTags([]);
    setActivePlatforms([]);
    fetchDailyData(selectedDate).then((data) => {
      setDailyData(data);
      setLoading(false);
    });
  }, [selectedDate]);

  const newsItems = dailyData?.newsItems ?? [];

  // Extract all unique tags from current day's news
  const allTags = useMemo(() => {
    const tech = new Set<string>();
    const comp = new Set<string>();
    const ppl = new Set<string>();
    newsItems.forEach((item) => {
      (item.tags?.technology ?? []).forEach((t) => tech.add(t));
      (item.tags?.company ?? []).forEach((t) => comp.add(t));
      (item.tags?.people ?? []).forEach((t) => ppl.add(t));
    });
    return {
      technology: Array.from(tech),
      company: Array.from(comp),
      people: Array.from(ppl),
    };
  }, [newsItems]);

  // Extract all unique platforms
  const platforms = useMemo(() => {
    const sites = new Set<string>();
    newsItems.forEach((item) => sites.add(item.site));
    return Array.from(sites);
  }, [newsItems]);

  // Filter items by tags and platforms
  const filteredItems = useMemo(() => {
    let items = newsItems;
    if (activePlatforms.length > 0) {
      items = items.filter((item) => activePlatforms.includes(item.site));
    }
    if (activeTags.length > 0) {
      items = items.filter((item) => {
        const itemTags = [
          ...(item.tags?.technology ?? []),
          ...(item.tags?.company ?? []),
          ...(item.tags?.people ?? []),
        ];
        return activeTags.some((tag) => itemTags.includes(tag));
      });
    }
    return items;
  }, [newsItems, activeTags, activePlatforms]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const togglePlatform = (platform: string) => {
    setActivePlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  if (loading || !dailyData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg animate-pulse" />
          <span className="text-zinc-400 text-sm font-mono">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-800 pb-20">
      <Analytics />
      <Header
        date={selectedDate}
        availableDates={availableDates}
        onDateChange={setSelectedDate}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 flex gap-8">
        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-24">
            <PlatformSidebar
              platforms={platforms}
              activePlatforms={activePlatforms}
              onTogglePlatform={togglePlatform}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-12">
          {/* Mobile Platform Bar */}
          <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
            <button
              onClick={() => setActivePlatforms([])}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activePlatforms.length === 0
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-500 bg-gray-100'
              }`}
            >
              All
            </button>
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  activePlatforms.includes(p)
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-500 bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Hero Section */}
          <section className="space-y-5">
            <DailyHeadline headline={dailyData.headline} />
            {dailyData.aiInsight && (
              <AIInsight insight={dailyData.aiInsight} />
            )}
          </section>

          {/* Feed Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-cyan-600 rounded-full inline-block" />
                Intelligence Feed
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 text-sm font-mono">
                  {filteredItems.length} Updates
                </span>
                <button
                  onClick={async () => {
                    if (exporting) return;
                    setExporting(true);
                    try { await exportToPdf(dailyData); }
                    finally { setExporting(false); }
                  }}
                  disabled={exporting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-60 transition-colors"
                  title="导出 PDF"
                >
                  {exporting ? (
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {exporting ? '生成中...' : '导出 PDF'}
                </button>
              </div>
            </div>

            <FilterBar
              allTags={allTags}
              activeTags={activeTags}
              onToggleTag={toggleTag}
              onClear={() => {
                setActiveTags([]);
                setActivePlatforms([]);
              }}
            />

            <NewsFeed items={filteredItems} />
          </section>
        </main>
      </div>
    </div>
  );
}
