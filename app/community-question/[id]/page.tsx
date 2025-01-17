'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Tag, Clock, BarChart3, Code2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
    _id?: { $oid: string };
  }>;
}

const difficultyColors = {
  basic: 'bg-emerald-400/10 text-emerald-500',
  intermediate: 'bg-orange-400/10 text-orange-500',
  expert: 'bg-red-500/10 text-red-500',
  advanced: 'bg-red-500/10 text-red-500'
};

export default function CommunityQuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/community-question/${id}`);
        if (!response.ok) throw new Error('Failed to fetch question');
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load question');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div className="container max-w-4xl py-6 mt-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container max-w-4xl py-6 mt-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Question not found</h1>
          <Link
            href="/contributed-questions"
            className="mt-4 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Community Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 mt-12">
      <Link
        href="/contributed-questions"
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Community Questions
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Question Header */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Code2 className="h-4 w-4" />
              {question.language}
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className={difficultyColors[question.difficulty as keyof typeof difficultyColors]}>
                {question.difficulty}
              </span>
            </div>
          </div>

          {question.description && (
            <p className="text-muted-foreground mb-4">{question.description}</p>
          )}

          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answer Section with Sub Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <h2 className="text-xl font-semibold mb-4">Answer</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{question.answer}</div>
          </div>

          {/* Sub Questions Section */}
          {question.subQuestions && question.subQuestions.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  {question.subQuestions.length}
                </span>
                Related Questions
              </h3>
              <div className="space-y-6">
                {question.subQuestions.map((subQ, index) => (
                  <motion.div
                    key={subQ._id?.$oid || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    className="rounded-lg border border-border"
                  >
                    <div className="p-4 bg-background">
                      <div className="flex items-start justify-between">
                        <h4 className="text-base font-medium flex-1">
                          {subQ.question}
                        </h4>
                        <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-primary/10">
                          Related #{index + 1}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap">{subQ.answer}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
