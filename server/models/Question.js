import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['SDE', 'Data Analyst', 'Product Manager', 'DevOps'],
  },
  level: {
    type: String,
    required: true,
    enum: ['Fresher', 'Experienced'],
  },
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  expectedKeywords: [String],
});

export default mongoose.model('Question', questionSchema);