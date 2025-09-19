import mongoose from "mongoose";

export async function mongooseConnect() {
  try {
    // Check if already connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection.asPromise();
    }

    // Use environment variable for MongoDB URI
    const url ="mongodb://0.0.0.0/PortfolioDatabase"
    //"mongodb://0.0.0.0/PortfolioDatabase";
    
    // Connect to MongoDB with additional options for better reliability
    const connection = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      connectTimeoutMS: 10000, // Connection timeout
    });

    console.log("Successfully connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Rethrow to allow caller to handle
  }
}