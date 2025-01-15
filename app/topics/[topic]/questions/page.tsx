'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { reactQuestions } from '../../../data/reactQuestions';

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'all';

export default function TopicQuestionsPage() {
  const { topic } = useParams();
  const [difficulty, setDifficulty] = useState<Difficulty>('all');

  // Get questions for the current topic
  const topicData = reactQuestions[topic as keyof typeof reactQuestions];
  
  if (!topicData) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold text-red-500">Topic not found</h1>
        <Link href="/topics/react" className="text-primary hover:underline mt-4 inline-block">
          Go back to topics
        </Link>
      </div>
    );
  }

  // Filter questions based on difficulty
  const filteredQuestions = topicData.questions.filter((q) => {
    if (difficulty === 'all') return true;
    return q.difficulty === difficulty;
  });

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/topics/react" 
              className="text-primary hover:underline"
            >
              ← Back to topics
            </Link>
          </div>
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

      <div className="space-y-6">
        {filteredQuestions.map((question, index) => (
          <div
            key={index}
            className="rounded-lg border border-border p-6 hover:border-foreground/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-4">{question.title}</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground">{question.answer}</p>
            </div>
            {question.subQuestions && question.subQuestions.length > 0 && (
              <div className="mt-4 space-y-4">
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
        ))}
      </div>
    </div>
  );
}
