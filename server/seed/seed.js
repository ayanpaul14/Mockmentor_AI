import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Question from '../models/Question.js';

// Fix: load .env from the server/ folder, not seed/ folder
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env') });

const questions = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'questions.json'), 'utf-8')
);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    await Question.insertMany(questions);
    console.log(`🌱 Seeded ${questions.length} questions successfully`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();