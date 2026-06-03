const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    // 🔑 Linked relational key pairing to match rows with your authenticated users
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Session document must be mapped to a valid authenticated user ID ref.']
    },
    
    // 🏷️ Metadata tracking layers
    role: {
      type: String,
      required: [true, 'Interview role track target parameter is required.']
    },
    level: {
      type: String,
      required: [true, 'Experience level tier specification parameter is required.']
    },
    topic: {
      type: String,
      default: 'General'
    },
    
    // 📝 Code submissions / Verbal text transcripts storage
    question: {
      type: String,
      required: [true, 'Original source prompt question text data is required.']
    },
    candidateAnswer: {
      type: String,
      required: [true, 'Candidate answer string text or script block content cannot be blank.']
    },
    
    // 📊 Nested evaluation metric scoring matrices
    scores: {
      clarity: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      },
      depth: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      },
      keywords: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      },
      // ✅ VITAL FOR CHART TREND LINES: The composite score evaluated from aggregate metrics
      overall: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      }
    }
  },
  {
    // ⏳ Automatically injects createdAt and updatedAt document tracking timestamps
    timestamps: true 
  }
);

// Prevent compiling errors if model is loaded multiple times during server reboots
module.exports = mongoose.models.Session || mongoose.model('Session', sessionSchema);