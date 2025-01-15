import mongoose from 'mongoose';

const subQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Sub question is required'],
    trim: true,
  },
  answer: {
    type: String,
    required: [true, 'Sub answer is required'],
    trim: true,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify difficulty level'],
    enum: ['basic', 'intermediate', 'expert', 'advanced'],
  },
  language: {
    type: String,
    required: [true, 'Please specify programming language'],
  },
  tags: {
    type: [String],
    default: [],
  },
  subQuestions: {
    type: [subQuestionSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model exists before creating a new one
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
