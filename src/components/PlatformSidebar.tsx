import React from 'react';
import { Globe } from 'lucide-react';
interface PlatformSidebarProps {
  platforms: string[];
  activePlatforms: string[];
  onTogglePlatform: (platform: string) => void;
}
export function PlatformSidebar({
  platforms,
  activePlatforms,
  onTogglePlatform
}: PlatformSidebarProps) {
  const isAllActive = activePlatforms.length === 0;
  const handleAllClick = () => {
    if (!isAllActive) {
      activePlatforms.forEach((p) => onTogglePlatform(p));
    }
  };
  return (
    <nav className="space-y-1">
      <div className="flex items-center gap-2 px-3 mb-3 text-zinc-400">
        <Globe className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono uppercase tracking-wider">
          Platform
        </span>
      </div>

      <button
        onClick={handleAllClick}
        className={`
          w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isAllActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900 hover:bg-gray-100'}
        `}>

        All Platforms
      </button>

      {platforms.map((platform) => {
        const isActive = activePlatforms.includes(platform);
        const count = isActive ? '' : '';
        return (
          <button
            key={platform}
            onClick={() => onTogglePlatform(platform)}
            className={`
              w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-900 hover:bg-gray-100'}
            `}>

            {platform}
          </button>);

      })}
    </nav>);

}