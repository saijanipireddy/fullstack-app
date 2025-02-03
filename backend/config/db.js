import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sai:nagasai@cluster0.h565n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB Connected Successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1); // Stop the process if DB fails
  }
};
