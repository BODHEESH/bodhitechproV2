'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, ArrowLeft, BookOpen, Target, Sparkles, Brain, Zap, Filter, Code2, CheckCircle2, Search, FileQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reactQuestions } from '../../data/reactQuestions';

type Difficulty = 'basic' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'all';

const difficultyIcons = {
  all: Filter,
  basic: Brain,
  beginner: Brain,
  intermediate: Target,
  advanced: Sparkles,
  expert: Zap
};

const difficultyColors = {
  all: 'from-primary to-primary/80',
  basic: 'from-emerald-500 to-emerald-600',
  beginner: 'from-emerald-500 to-emerald-600',
  intermediate: 'from-blue-500 to-blue-600',
  advanced: 'from-purple-500 to-purple-600',
  expert: 'from-pink-500 to-pink-600'
};

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function QuestionsPage() {
  const router = useRouter();
  const { topic } = useParams();
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // Get topic data
  const currentTopic = topic as string;
  const topicData = reactQuestions[currentTopic as keyof typeof reactQuestions];

  if (!topicData) {
    return (
      <div className="container py-6 mt-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-red-500"
        >
          Topic not found
        </motion.h1>
      </div>
    );
  }

  // Filter questions based on difficulty
  const filteredQuestions = topicData.questions.filter((q) => {
    if (difficulty === 'all') return true;
    return q.difficulty.toLowerCase() === difficulty.toLowerCase();
  });

  const DifficultyIcon = difficultyIcons[difficulty];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-6 mt-12"
    >
      <div className="mb-12">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Topics
        </motion.button>

        <div className="flex justify-between items-start gap-6 flex-wrap">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-[280px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/15 ring-4 ring-primary/10 ring-offset-2 ring-offset-background">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {topicData.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">{topicData.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative min-w-[200px]"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <DifficultyIcon className="h-5 w-5 text-primary" />
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="pl-11 pr-4 py-3 rounded-xl border border-border bg-background/50 focus:ring-4 ring-primary/10 focus:border-primary transition-all duration-200 appearance-none min-w-[200px]"
            >
              <option value="all">All Levels</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-primary" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => {
              const isExpanded = expandedQuestion === index;
              const Icon = difficultyIcons[question.difficulty as Difficulty];

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  layout
                  className={`group rounded-2xl border border-border bg-gradient-to-br from-background/50 via-background/80 to-background/50 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'ring-2 ring-primary/20' : 'hover:border-primary/50'
                  }`}
                >
                  <motion.button
                    layout="position"
                    onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${difficultyColors[question.difficulty as Difficulty]} bg-opacity-10 ring-4 ring-offset-2 ring-offset-background transition-all duration-300 ${
                          isExpanded ? 'ring-primary/20' : 'ring-transparent group-hover:ring-primary/10'
                        }`}>
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {question.title}
                          </h3>
                          {question.tags && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {question.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary"
                                >
                                  # {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-1.5 rounded-lg bg-primary/10"
                      >
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-4 border-t border-border">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            {question.answer.split('\n').map((paragraph, i) => (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="mb-4 last:mb-0"
                              >
                                {paragraph}
                              </motion.p>
                            ))}
                          </div>

                          {/* Tags Section */}
                          {/* {question.tags && question.tags.length > 0 && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6 flex flex-wrap gap-2"
                            >
                              {question.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </motion.div>
                          )} */}

                          {/* Related Questions Section */}
                          {question.subQuestions && question.subQuestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mt-8 space-y-6"
                            >
                              <h4 className="text-lg font-semibold text-primary">Related Questions</h4>
                              <div className="grid gap-4">
                                {question.subQuestions.map((subQ, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                                  >
                                    <h5 className="font-medium text-primary mb-2">
                                      {subQ.question}
                                    </h5>
                                    <p className="text-muted-foreground">
                                      {subQ.answer}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* Metadata Section */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 flex flex-wrap items-center gap-3"
                          >
                            <span className={`px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r ${difficultyColors[question.difficulty as Difficulty]} bg-opacity-10 text-primary`}>
                              {question.difficulty}
                            </span>
                            {question.category && (
                              <span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                                {question.category}
                              </span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative p-4 bg-primary/10 rounded-full ring-4 ring-primary/30 ring-offset-2 ring-offset-background">
                  <FileQuestion className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3"
              >
                No Questions Found
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-center max-w-md"
              >
                Try selecting a different difficulty level or check back later for more questions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-sm text-primary/80"
              >
                <Search className="w-4 h-4" />
                <span>Filtered by: {difficulty}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
