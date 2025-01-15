'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { reactQuestions } from '@/app/data/reactQuestions';

export default function TopicQuestionsPage() {
  const { topic, id } = useParams();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const topicData = reactQuestions[id as string];

  if (!topicData) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Topic not found</h1>
        <p>The requested topic does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2">{topicData.title}</h1>
      <p className="text-muted-foreground mb-6">{topicData.description}</p>

      <div className="space-y-4">
        {topicData.questions.map((question, index) => (
          <div
            key={index}
            className="rounded-lg border border-border overflow-hidden"
          >
            <button
              onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              className="w-full p-4 flex justify-between items-center hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-semibold text-left">{question.title}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {question.difficulty}
                </span>
              </div>
              {openQuestion === index ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {openQuestion === index && (
              <div className="p-4 border-t border-border">
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-lg font-medium mb-2">Answer</h3>
                  <p>{question.answer}</p>

                  {question.subQuestions && question.subQuestions.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Follow-up Questions</h3>
                      <div className="space-y-4">
                        {question.subQuestions.map((subQ, idx) => (
                          <div key={idx} className="bg-accent/50 p-4 rounded-lg">
                            <p className="font-medium mb-2">{subQ.question}</p>
                            <p className="text-muted-foreground">{subQ.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {question.tags && question.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {question.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
