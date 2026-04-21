import mongoose from "mongoose"; // Mongoose
import { Schema, Document } from "mongoose"; // Schema types

export interface IBoard extends Document {
  // Board interface
  name: string; // Name
  userId: string; // User ID
  columns: mongoose.Types.ObjectId[]; // Columns refs
  createdAt: Date; // Created
  updatedAt: Date; // Updated
}

const BoardSchema = new Schema<IBoard>( // Board schema
  {
    name: { type: String, required: true }, // Name field
    userId: { type: String, required: true, index: true }, // User ID with index
    columns: [{ type: Schema.Types.ObjectId, ref: "Column" }], // Columns array
  },
  {
    timestamps: true, // Auto timestamps
  },
);

export default mongoose.models.Board || // Export model
  mongoose.model<IBoard>("Board", BoardSchema);
