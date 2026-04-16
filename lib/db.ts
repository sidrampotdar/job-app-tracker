import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

interface MongoooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  // allow global `var` declarations

  var mongoose: MongoooseCache | undefined;
}

const cached: MongoooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const connectDB = async (): Promise<void> => {
  try {
    // Attempt connection
    await mongoose.connect(MONGODB_URI, {
      // Common configuration options
      autoIndex: true, // Useful for development, maybe false in production
    });

    console.log("MongoDB successfully connected.");
  } catch (error) {
    console.error("Initial MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Monitor connection events for lifecycle management
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default connectDB;
