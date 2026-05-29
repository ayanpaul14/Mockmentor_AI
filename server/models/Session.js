import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: String,
    level: String,
    topic: String,
    question: String,
    candidateAnswer: String,
    scores: {
      clarity: Number,
      depth: Number,
      keywords: Number,
      overall: Number,
    },
    missedPoints: [String],
    strengths: [String],
    modelAnswer: String,
    verdict: String,
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);