'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout } from 'lucide-react';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, title }) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#181d16] text-white flex flex-col py-6 px-4 gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-lg bg-[#176a22] flex items-center justify-center">
          <Sprout className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold">
          Agri<span className="text-[#176a22]">Connect</span>
        </span>
      </div>

      {title && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 mb-2">
          {title}
        </p>
      )}

      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-[#176a22] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10',
              ].join(' ')}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
