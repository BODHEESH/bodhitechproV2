'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Filter, BookOpen } from 'lucide-react';

interface Question {
  _id: string;
  title: string;
  description?: string;
  difficulty: string;
  language: string;
  answer: string;
  topic: string;
  tags: string[];
  subQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

const difficultyColors = {
  basic: 'bg-emerald-400/10 text-emerald-500',
  intermediate: 'bg-orange-400/10 text-orange-500',
  expert: 'bg-red-500/10 text-red-500',
  advanced: 'bg-red-500/10 text-red-500'
};

export default function CommunityTopicPage() {
  const { topic } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (topic) params.append('topic', topic as string);
        if (difficulty !== 'all') params.append('difficulty', difficulty);
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

    fetchQuestions();
  }, [topic, difficulty, searchQuery]);

  if (loading) {
    return (
      <div className="container max-w-4xl py-6 mt-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            {topic ? `${topic} Questions` : 'Community Questions'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore questions contributed by the community
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          >
            <option value="all">All Levels</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No questions found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <motion.div
              key={question._id}
              className="border border-border rounded-xl overflow-hidden bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedQuestion(expandedQuestion === question._id ? null : question._id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    {question.description && (
                      <p className="text-muted-foreground text-sm mt-1">
                        {question.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
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
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expandedQuestion === question._id ? 'rotate-180' : ''
                    }`}
                  />
                  {expandedQuestion === question._id ? 'Hide Answer' : 'Show Answer'}
                </div>
              </div>

              <AnimatePresence>
                {expandedQuestion === question._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border"
                  >
                    <div className="p-4 bg-muted/50">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <h4 className="text-base font-medium mb-2">Answer:</h4>
                        <div className="whitespace-pre-wrap">{question.answer}</div>
                      </div>

                      {question.subQuestions && question.subQuestions.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-base font-medium mb-2">Related Questions:</h4>
                          <div className="space-y-3">
                            {question.subQuestions.map((subQ, index) => (
                              <div key={index} className="bg-background rounded-lg p-3">
                                <p className="font-medium mb-2">{subQ.question}</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {subQ.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
