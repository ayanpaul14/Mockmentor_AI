import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // Academic & Placement Meta Fields
    college: {
      type: String,
      default: 'Brainware University', // Dynamically sets profile target
    },
    specialization: {
      type: String,
      default: 'B.Tech CSE (AI & ML)', // Explicit fallback mapping
    },
    location: {
      type: String,
      default: 'Kolkata, India', // Set region background context
    },
    // Core Gamification & Consistency Trackers
    currentStreak: { 
      type: Number, 
      default: 0 
    },
    longestStreak: { 
      type: Number, 
      default: 0 
    },
    lastSessionDate: { 
      type: String, 
      default: null 
    }, // Stored consistently as 'YYYY-MM-DD'
    
    // Extensible Verification Sub-documents & Earned Certifications
    badges: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: true },
        desc: { type: String, required: true },
        date: { type: String, required: true }
      }
    ],

    // Nested reference metadata caching recent transcript summaries directly
    sessions: [
      {
        id: { type: String, required: true },
        role: { type: String, required: true },
        topic: { type: String, required: true },
        score: { type: Number, required: true },
        date: { type: String, required: true },
        clarity: { type: Number, required: true },
        depth: { type: Number, required: true },
        keywords: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

// Presave hashing mechanism hook for password security transformations
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method mapping to securely contrast user password entries
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);