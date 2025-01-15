export interface SubQuestion {
  question: string;
  answer: string;
}

export interface Question {
  title: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
  language: string;
  scenario?: string;
  answer: string;
  subQuestions?: SubQuestion[];
  example?: string;
  tags?: string[];
}

export interface TopicData {
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuestionsData {
  [key: string]: TopicData;
}
