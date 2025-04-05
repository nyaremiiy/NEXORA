import mongoose from 'mongoose';

const UserWordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    en: {
      type: String,
      required: true,
      trim: true,
    },
    ua: {
      type: String,
      required: true,
      trim: true,
    },
    transcription: {
      type: String,
      default: '—',
      trim: true,
    },
    status: {
      type: Number,
      default: 0, // від 0 до 100, рівень вивчення
    },
  },
  {
    timestamps: true,
  }
);

UserWordSchema.index({ userId: 1, en: 1 }, { unique: true });

export default mongoose.model('UserWord', UserWordSchema);
