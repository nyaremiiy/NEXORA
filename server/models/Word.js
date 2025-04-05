import mongoose from 'mongoose';

const WordScema = new mongoose.Schema(
  {
    en: {
      type: String,
      required: true,
      unique: true,
    },
    transcription: {
      type: String,
      required: false,
      default: '—'
    },
    ua: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Word', WordScema);
