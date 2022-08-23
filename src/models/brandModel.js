import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, ' Cateory must be unique'],
      minlength: [3, 'Too short brand name'],
      maxlength: [32, 'Too long brand name'],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    image: { type: String },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

// findOne, findAll and update
BrandSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
BrandSchema.post('save', (doc) => {
  setImageURL(doc);
});

const Brand = mongoose.model('Brand', BrandSchema);

export { Brand };
