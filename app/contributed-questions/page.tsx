'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Zap, Code2, Database, Layout, Server, Sparkles, BookOpen, Tag, ChevronRight, Clock, BarChart3, Trophy, UserCircle2 } from 'lucide-react';
import Link from 'next/link';

type Question = {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  language: string;
  tags: string[];
  userInfo: {
    name: string;
  };
  userId: string;
  created_user: string;
  createdAt?: string;
};

const difficultyColors = {
  basic: 'bg-emerald-400/10 text-emerald-500',
  intermediate: 'bg-orange-400/10 text-orange-500',
  expert: 'bg-red-500/10 text-red-500',
  advanced: 'bg-red-500/10 text-red-500'
};

const languages = [
  { name: 'All Languages', value: 'all' },
  { name: 'React', value: 'react' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Node.js', value: 'nodejs' },
  // Add more languages as needed
];

const difficulties = [
  { name: 'All Levels', value: 'all' },
  { name: 'Basic', value: 'basic' },
  { name: 'Intermediate', value: 'intermediate' },
  { name: 'Advanced', value: 'advanced' },
  { name: 'Expert', value: 'expert' },
];

export default function ContributedQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);
      if (selectedLanguage !== 'all') params.append('language', selectedLanguage);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/contributed-questions?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedDifficulty, selectedLanguage, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background mt-12"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Community Questions 🌟
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore questions contributed by the community
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    {languages.map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No questions found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {questions.map((question) => (
                <Link key={question._id} href={`/community-question/${question._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Link
                            href={`/community-question/${question._id}`}
                            className="text-lg font-medium hover:text-primary transition-colors line-clamp-1"
                          >
                            {question.title}
                          </Link>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>•</span>
                            <UserCircle2 className="h-4 w-4" />
                            {question.userInfo?.name ? (
                              <Link
                                href={`/profile/${question.created_user || question.userId}`}
                                className="hover:text-primary transition-colors"
                              >
                                {question.userInfo.name}
                              </Link>
                            ) : (
                              <span className="italic">Anonymous Contributor</span>
                            )}
                          </span>
                        </div>
                        {question.description && (
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {question.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {question.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            difficultyColors[question.difficulty as keyof typeof difficultyColors]
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {question.language}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
