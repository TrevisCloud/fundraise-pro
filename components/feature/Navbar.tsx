'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'ri-dashboard-line' },
    { name: 'Campaigns', href: '/campaigns', icon: 'ri-megaphone-line' },
    { name: 'Reports', href: '/reports', icon: 'ri-bar-chart-line' },
    { name: 'Integrations', href: '/integrations', icon: 'ri-links-line' }
  ];

  return (
    <nav className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="ri-heart-line text-primary-foreground text-lg"></i>
              </div>
              <span className="text-xl font-bold text-foreground">FundRaise Pro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              <i className={`${theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'} text-xl`}></i>
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground rounded-md">
              <i className="ri-notification-line text-xl"></i>
            </button>
            <Link href="/settings" className="flex items-center space-x-2 hover:bg-accent rounded-md px-2 py-1 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <i className="ri-user-line text-muted-foreground"></i>
              </div>
              <span className="text-sm font-medium text-foreground">Admin User</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              href="/settings"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="ri-settings-line text-lg"></i>
              <span>Settings</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
