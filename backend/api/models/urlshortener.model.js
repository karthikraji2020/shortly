const mongoose = require ('mongoose');

const URLShortenerSchema = mongoose.Schema(
  {
    userId: {
      type: String 
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('URLShortener',URLShortenerSchema);