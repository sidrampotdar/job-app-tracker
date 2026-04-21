import mongoose, { Schema, Document } from "mongoose"; // Mongoose

export interface IColumn extends Document {
  // Column interface
  name: string; // Name
  boardId: mongoose.Types.ObjectId; // Board ref
  order: number; // Order
  jobApplications: mongoose.Types.ObjectId[]; // Apps refs
  createdAt: Date; // Created
  updatedAt: Date; // Updated
}

// Board -> Columns -> JobApplications

const ColumnSchema = new Schema<IColumn>( // Column schema
  {
    name: {
      // Name field
      type: String,
      required: true,
    },
    boardId: {
      // Board ID
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: {
      // Order
      type: Number,
      required: true,
      default: 0,
    },
    jobApplications: [
      // Apps array
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true, // Timestamps
  },
);

export default mongoose.models.Column || // Export model
  mongoose.model<IColumn>("Column", ColumnSchema);
