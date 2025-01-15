'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { reactQuestions } from '../data/reactQuestions';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Zap, 
  Code2, 
  Database, 
  Layout, 
  Server,
  Sparkles,
  BookOpen,
  Tag,
  ChevronRight,
  Clock,
  BarChart3,
  Trophy
} from 'lucide-react';

type ExperienceLevel = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

const difficultyColors = {
  basic: 'bg-emerald-400/10 text-emerald-500',
  intermediate: 'bg-orange-400/10 text-orange-500',
  expert: 'bg-red-500/10 text-red-500',
  advanced: 'bg-red-500/10 text-red-500'
};

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  fullstack: Code2,
  database: Database,
};

const languages = [
  { name: 'All Languages', value: 'all' },
  { name: 'React', value: 'react' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Node.js', value: 'nodejs' },
];

const experienceLevels = [
  { name: 'All Levels', value: 'all' },
  { name: 'Beginner', value: 'beginner' },
  { name: 'Intermediate', value: 'intermediate' },
  { name: 'Advanced', value: 'advanced' },
  { name: 'Expert', value: 'expert' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Get all topics from reactQuestions
  const topics = Object.entries(reactQuestions).map(([key, value]) => ({
    id: key,
    title: value.title,
    description: value.description,
    questions: value.questions,
  }));

  useEffect(() => {
    setLoading(false);
  }, []);

  // Count total questions
  const totalQuestions = Object.values(reactQuestions).reduce((total, topic) => {
    return total + topic.questions.length;
  }, 0);

  // Filter topics based on selected filters
  const filteredTopics = topics.filter((topic) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchLower === '' || 
      topic.title.toLowerCase().includes(searchLower) ||
      topic.description.toLowerCase().includes(searchLower) ||
      topic.questions.some(q => 
        q.title.toLowerCase().includes(searchLower) ||
        q.answer.toLowerCase().includes(searchLower) ||
        (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );

    // Language filter
    const matchesLanguage = selectedLanguage === 'all' || 
      topic.questions.some(q => q.language.toLowerCase() === selectedLanguage.toLowerCase());

    // Experience level filter
    const matchesExperience = experienceLevel === 'all' || 
      topic.questions.some(q => q.difficulty === experienceLevel);

    return matchesSearch && matchesLanguage && matchesExperience;
  });

  // Get all unique tags for the search suggestions
  const allTags = Array.from(new Set(
    topics.flatMap(topic => 
      topic.questions.flatMap(q => q.tags || [])
    )
  ));

  // Search suggestions based on current input
  const getSearchSuggestions = () => {
    if (!searchQuery) return [];
    const searchLower = searchQuery.toLowerCase();
    
    const suggestions = [
      // Topic suggestions
      ...topics
        .filter(t => t.title.toLowerCase().includes(searchLower))
        .map(t => ({ type: 'topic', text: t.title })),
      
      // Tag suggestions
      ...allTags
        .filter(tag => tag.toLowerCase().includes(searchLower))
        .map(tag => ({ type: 'tag', text: tag })),
      
      // Question suggestions
      ...topics
        .flatMap(t => t.questions
          .filter(q => q.title.toLowerCase().includes(searchLower))
          .map(q => ({ type: 'question', text: q.title }))
        )
    ];

    // Limit to top 5 suggestions
    return suggestions.slice(0, 5);
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestions = getSearchSuggestions();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: Layout },
    { id: 'backend', name: 'Backend', icon: Server },
    { id: 'fullstack', name: 'Full Stack', icon: Code2 },
    { id: 'database', name: 'Database', icon: Database },
  ];

  const difficulties = [
    { id: 'basic', name: 'Basic', color: 'emerald' },
    { id: 'intermediate', name: 'Intermediate', color: 'orange' },
    { id: 'expert', name: 'Expert', color: 'red' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20"
    >
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div 
          whileHover={{ scale: 1.03, rotate: -1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 shadow-lg shadow-emerald-500/5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/20 ring-4 ring-emerald-500/10 ring-offset-2 ring-offset-background">
              <BookOpen className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-500/80">Total Questions</p>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent">{totalQuestions}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.03, rotate: 1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 shadow-lg shadow-blue-500/5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 ring-4 ring-blue-500/10 ring-offset-2 ring-offset-background">
              <Trophy className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-500/80">Basic Questions</p>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-blue-600 bg-clip-text text-transparent">
                {topics.reduce((acc, topic) => acc + topic.questions.filter(q => q.difficulty === 'basic').length, 0)}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.03, rotate: -1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 shadow-lg shadow-purple-500/5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 ring-4 ring-purple-500/10 ring-offset-2 ring-offset-background">
              <BarChart3 className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-500/80">Intermediate Questions</p>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-purple-500 to-purple-600 bg-clip-text text-transparent">
                {topics.reduce((acc, topic) => acc + topic.questions.filter(q => q.difficulty === 'intermediate').length, 0)}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.03, rotate: 1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent border border-pink-500/20 shadow-lg shadow-pink-500/5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-pink-500/20 ring-4 ring-pink-500/10 ring-offset-2 ring-offset-background">
              <Zap className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-pink-500/80">Expert Questions</p>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-pink-500 to-pink-600 bg-clip-text text-transparent">
                {topics.reduce((acc, topic) => acc + topic.questions.filter(q => q.difficulty === 'expert').length, 0)}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1" ref={searchRef}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary/10">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              placeholder="Search topics or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border bg-background/50 focus:ring-4 ring-primary/10 focus:border-primary transition-all duration-200"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 left-0 right-0 mt-2 py-2 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-xl"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={`${suggestion.type}-${index}`}
                    whileHover={{ scale: 0.99 }}
                    onClick={() => {
                      setSearchQuery(suggestion.text);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-primary/10 flex items-center gap-3 group"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {suggestion.type === 'topic' && <Layout className="h-4 w-4 text-primary" />}
                      {suggestion.type === 'tag' && <Tag className="h-4 w-4 text-primary" />}
                      {suggestion.type === 'question' && <Search className="h-4 w-4 text-primary" />}
                    </div>
                    <span className="flex-1 truncate">{suggestion.text}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">{suggestion.type}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
          <div className="flex gap-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3.5 rounded-2xl border border-border bg-background/50 focus:ring-4 ring-primary/10 focus:border-primary transition-all duration-200"
            >
              {languages.map(language => (
                <option key={language.value} value={language.value}>{language.name}</option>
              ))}
            </select>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
              className="px-4 py-3.5 rounded-2xl border border-border bg-background/50 focus:ring-4 ring-primary/10 focus:border-primary transition-all duration-200"
            >
              {experienceLevels.map(level => (
                <option key={level.value} value={level.value}>{level.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredTopics.map((topic) => {
            const CategoryIcon = categoryIcons['frontend'] || Code2;
            const difficulties = Array.from(new Set(topic.questions.map(q => q.difficulty)));
            const tags = Array.from(new Set(topic.questions.flatMap(q => q.tags || [])));
            
            return (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                layout
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => router.push(`/questions/${topic.id}`)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background/50 via-background/80 to-background/50 p-6 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-primary/15 ring-4 ring-primary/10 ring-offset-2 ring-offset-background group-hover:ring-primary/20 transition-all">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      {difficulties.map((difficulty) => (
                        <span 
                          key={difficulty}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}
                        >
                          {difficulty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">{topic.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {topic.description}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1.5 group-hover:bg-primary/15 transition-colors"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span>{topic.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
                      View Questions
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredTopics.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              delay: 0.2 
            }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-2xl"></div>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full ring-4 ring-primary/30 ring-offset-4 ring-offset-background"
            >
              <Sparkles className="h-12 w-12 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-3"
          >
            No Topics Found
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-center text-lg max-w-md"
          >
            Try adjusting your search or filters
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 text-primary/80 border border-primary/20"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search: "{searchQuery}"</span>
          </motion.div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading questions...</p>
        </motion.div>
      )}
    </motion.div>
  );
}
