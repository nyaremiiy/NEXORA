import mongoose from 'mongoose';

const WordInCardSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserWord',
    required: true,
  }
});

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    words: [WordInCardSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Card', CardSchema);
