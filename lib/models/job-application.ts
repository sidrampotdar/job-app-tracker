import mongoose, { Schema, Document } from "mongoose"; // Mongoose

export interface IJobApplication extends Document {
  // Job app interface
  company: string; // Company
  position: string; // Position
  location?: string; // Location
  status: string; // Status
  columnId: mongoose.Types.ObjectId; // Column ref
  boardId: mongoose.Types.ObjectId; // Board ref
  userId: string; // User ID
  order: number; // Order
  notes?: string; // Notes
  salary?: string; // Salary
  jobUrl?: string; // Job URL
  appliedDate?: Date; // Applied date
  tags?: string[]; // Tags
  description?: string; // Description
  createdAt: Date; // Created
  updatedAt: Date; // Updated
}

const JobApplicationSchema = new Schema<IJobApplication>( // Job app schema
  {
    company: {
      // Company field
      type: String,
      required: true,
    },
    position: {
      // Position field
      type: String,
      required: true,
    },
    location: {
      // Location field
      type: String,
    },
    status: {
      // Status field
      type: String,
      required: true,
      default: "applied",
    },
    columnId: {
      // Column ID
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
    boardId: {
      // Board ID
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    userId: {
      // User ID
      type: String,
      required: true,
      index: true,
    },
    order: {
      // Order
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      // Notes
      type: String,
    },
    salary: {
      // Salary
      type: String,
    },
    jobUrl: {
      // Job URL
      type: String,
    },
    appliedDate: {
      // Applied date
      type: Date,
    },
    tags: [
      // Tags array
      {
        type: String,
      },
    ],
    description: {
      // Description
      type: String,
    },
  },
  {
    timestamps: true, // Timestamps
  },
);

export default mongoose.models.JobApplication || // Export model
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
