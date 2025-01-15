'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { reactQuestions } from '../../data/reactQuestions';
import { ChevronDown } from 'lucide-react';

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'all';

interface Question {
  title: string;
  difficulty: string;
  category: string;
  answer: string;
  subQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

interface TopicData {
  title: string;
  description: string;
  questions: Question[];
}

export default function TopicPage() {
  const { topic } = useParams();
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // Get topic data
  const currentTopic = topic as string;
  const topicData: TopicData = reactQuestions[currentTopic as keyof typeof reactQuestions];

  if (!topicData) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold text-red-500">Topic not found</h1>
      </div>
    );
  }

  // Filter questions based on difficulty
  const filteredQuestions = topicData.questions.filter((q) => {
    if (difficulty === 'all') return true;
    return q.difficulty.toLowerCase() === difficulty.toLowerCase();
  });

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{topicData.title}</h1>
          <p className="text-muted-foreground mt-2">{topicData.description}</p>
        </div>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="px-4 py-2 rounded-md border border-border bg-background"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-accent/50 text-left"
            >
              <h3 className="text-lg font-semibold pr-4">{question.title}</h3>
              <ChevronDown 
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                  expandedQuestion === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedQuestion === index && (
              <div className="px-6 py-4 border-t border-border bg-card/50">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{question.answer}</p>
                </div>
                
                {question.subQuestions && question.subQuestions.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="font-semibold">Related Questions:</h4>
                    {question.subQuestions.map((subQ, idx) => (
                      <div key={idx} className="pl-4 border-l-2 border-border">
                        <p className="font-medium">{subQ.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">{subQ.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {question.difficulty}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                    {question.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No questions found</h3>
            <p className="text-sm text-muted-foreground">
              Try selecting a different difficulty level
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
