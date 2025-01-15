'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, PlusCircle, LayoutDashboard, Menu, X, ChevronRight, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { reactQuestions } from '../data/reactQuestions';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'topic' | 'question';
  parentTopic?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Question', path: '/add-question', icon: PlusCircle },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Search functionality
  useEffect(() => {
    console.log("Search query changed:", searchQuery);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search through topics and questions
    Object.entries(reactQuestions).forEach(([topicId, topicData]) => {
      // Match topic
      if (
        topicData.title.toLowerCase().includes(query) ||
        topicData.description.toLowerCase().includes(query)
      ) {
        results.push({
          id: topicId,
          title: topicData.title,
          description: topicData.description,
          type: 'topic'
        });
      }

      // Match questions
      topicData.questions.forEach((question) => {
        if (
          question.title.toLowerCase().includes(query) ||
          question.answer.toLowerCase().includes(query)
        ) {
          results.push({
            id: `${topicId}-${question.title}`,
            title: question.title,
            description: question.answer.slice(0, 100) + '...',
            type: 'question',
            parentTopic: topicId
          });
        }
      });
    });

    console.log("Search results:", results);
    setSearchResults(results.slice(0, 5)); // Limit to 5 results
    setIsSearchOpen(true);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    console.log("handleResultClick called with:", result);
    if (result.type === 'topic') {
      router.push(`/questions/${result.id}`);
    } else {
      console.log("Navigating to question's topic:", result.parentTopic);
      router.push(`/questions/${result.parentTopic}`);
    }
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              BodhiTech Pro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <motion.div
              ref={searchRef}
              initial={false}
              animate={{ width: isSearchOpen ? '300px' : '200px' }}
              className="relative"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-full bg-background rounded-xl border border-border shadow-lg overflow-hidden"
                  >
                    {searchResults.map((result) => (
                      <motion.button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors flex items-center space-x-2"
                        whileHover={{ x: 4 }}
                      >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.type}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10 text-foreground'
                      } transition-colors duration-200`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => {
                    console.log("Mobile search input changed:", e.target.value);
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                {searchQuery.trim() !== '' && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 w-full bg-background rounded-xl border border-border shadow-lg overflow-hidden z-50"
                  >
                    {searchResults.map((result) => (
                      <motion.button
                        key={result.id}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Mobile search result clicked:", result);
                          handleResultClick(result);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors flex items-center space-x-2"
                        whileHover={{ x: 4 }}
                      >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-xs text-muted-foreground">{result.type}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10 text-foreground'
                      } transition-colors duration-200`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Mobile Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
