'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Tag, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddQuestionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    answer: '',
    difficulty: '',
    language: '',
    tags: [] as string[],
    subQuestions: [{ question: '', answer: '' }] as { question: string; answer: string }[],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.filter(tag => tag.trim() !== ''),
          subQuestions: formData.subQuestions.filter(sq => sq.question.trim() !== '' && sq.answer.trim() !== ''),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add question');
      }

      toast.success('Question added successfully!');
      setFormData({
        title: '',
        description: '',
        answer: '',
        difficulty: '',
        language: '',
        tags: [],
        subQuestions: [{ question: '', answer: '' }],
      });
      setTagInput('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSubQuestion = () => {
    setFormData({
      ...formData,
      subQuestions: [...formData.subQuestions, { question: '', answer: '' }],
    });
  };

  const removeSubQuestion = (index: number) => {
    const newSubQuestions = [...formData.subQuestions];
    newSubQuestions.splice(index, 1);
    setFormData({
      ...formData,
      subQuestions: newSubQuestions,
    });
  };

  const updateSubQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    const newSubQuestions = [...formData.subQuestions];
    newSubQuestions[index][field] = value;
    setFormData({
      ...formData,
      subQuestions: newSubQuestions,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Add New Question</h1>
            <p className="text-muted-foreground">
              Contribute to our question bank by adding a new interview question
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[150px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                required
              >
                <option value="">Select difficulty</option>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Programming Language <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                required
              >
                <option value="">Select language</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Sub Questions</label>
                <motion.button
                  type="button"
                  onClick={addSubQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Sub Question
                </motion.button>
              </div>

              <AnimatePresence>
                {formData.subQuestions.map((subQ, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 p-4 rounded-xl border border-border bg-background/50"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Sub Question {index + 1}</h3>
                      {index > 0 && (
                        <motion.button
                          type="button"
                          onClick={() => removeSubQuestion(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={subQ.question}
                          onChange={(e) => updateSubQuestion(index, 'question', e.target.value)}
                          placeholder="Enter sub question"
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        />
                      </div>
                      <div>
                        <textarea
                          value={subQ.answer}
                          onChange={(e) => updateSubQuestion(index, 'answer', e.target.value)}
                          placeholder="Enter answer for sub question"
                          rows={3}
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...formData.tags];
                        newTags.splice(index, 1);
                        setFormData({ ...formData, tags: newTags });
                      }}
                      className="hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInput.trim()) {
                      e.preventDefault();
                      if (!formData.tags.includes(tagInput.trim())) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, tagInput.trim()],
                        });
                      }
                      setTagInput('');
                    }
                  }}
                  placeholder="Add tags (press Enter)"
                  className="flex-1 p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, tagInput.trim()],
                      });
                      setTagInput('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding Question...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Question
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}


