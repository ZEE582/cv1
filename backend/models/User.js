/**
 * @file models/User.js
 * @description نموذج المستخدم الموحد والمتكامل
 *
 * الأدوار:
 *  seeker  → باحث عن عمل (الافتراضي عند التسجيل الذاتي)
 *  company → حساب شركة (ينشئه الأدمن فقط عبر POST /api/auth/company-account)
 *  admin   → مدير المنصة (يُضاف يدوياً في قاعدة البيانات أو بـ seed)
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },

  role: {
    type: String,
    enum: ['seeker', 'company', 'admin'],
    default: 'seeker'
  },

  phone: {
    type: String,
    trim: true
  },

  avatar_url: {
    type: String
  },

  is_verified: {
    type: Boolean,
    default: false
  },

  is_active: {
    type: Boolean,
    default: true
  },

  progress: {
    solvedProblems: [{
      problemId: { type: String, ref: 'Problem' },
      completedAt: { type: Date, default: Date.now },
      codeSolution: String,
      notes: String
    }],

    studyPlans: {
      type: Map,
      of: {
        total: Number,
        completed: Number,
        lastAccessed: Date
      },
      default: {}
    }
  },

  stats: {
    totalSolved: { type: Number, default: 0 },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: Date
  }
}, { timestamps: true });

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);