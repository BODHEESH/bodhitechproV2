'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Tag, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Sparkles,
  BookOpen,
  Code2,
  Layout,
  Server,
  Database,
  Zap,
  Brain,
  Trophy,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const difficultyColors = {
  basic: 'bg-emerald-400/10 text-emerald-500 border-emerald-500/20',
  intermediate: 'bg-orange-400/10 text-orange-500 border-orange-500/20',
  advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  expert: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
};

export default function AddQuestionPage() {
  const router = useRouter();
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

      // Show success message
      toast.success('Question added successfully!', {
        duration: 3000,
        icon: '🎉',
      });

      // Reset form
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

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

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
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background pb-20"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Share Your Knowledge 🚀
            </h1>
            <p className="text-xl text-muted-foreground">
              Help others learn by contributing a question to our growing collection ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Section */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Question Details 📝</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter the main question title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[100px]"
                    placeholder="Add any additional context or description"
                  />
                </div>
              </div>
            </motion.div>

            {/* Difficulty and Language Section */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Difficulty & Language 🎯</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className={`w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${
                      formData.difficulty ? difficultyColors[formData.difficulty as keyof typeof difficultyColors] : ''
                    }`}
                    required
                  >
                    <option value="">Select Difficulty</option>
                    <option value="basic">Basic 🌱</option>
                    <option value="intermediate">Intermediate 🌟</option>
                    <option value="advanced">Advanced 🚀</option>
                    <option value="expert">Expert 👑</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language/Framework <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    required
                  >
                    <option value="">Select Language</option>
                    <option value="react">React ⚛️</option>
                    <option value="javascript">JavaScript 💛</option>
                    <option value="typescript">TypeScript 💙</option>
                    <option value="nodejs">Node.js 💚</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Answer Section */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Answer & Solutions ⭐</h2>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[150px]"
                  placeholder="Provide a detailed answer"
                  required
                />
              </div>
            </motion.div>

            {/* Tags Section */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-emerald-500" />
                <h2 className="text-xl font-semibold">Tags & Keywords 🏷️</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tagInput.trim()) {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, tagInput.trim()]
                          });
                          setTagInput('');
                        }
                      }
                    }}
                    className="flex-1 p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Add tags (press Enter)"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tagInput.trim()) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, tagInput.trim()]
                        });
                        setTagInput('');
                      }
                    }}
                    className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData({ ...formData, tags: newTags });
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Submit Button - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4 border-t border-border">
              <div className="container max-w-3xl mx-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-primary-foreground py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Magic... ✨
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Share Your Knowledge 🚀
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
