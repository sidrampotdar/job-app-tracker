"use server";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  columnId: string;
  boardId: string;
  description?: string;
}

export default async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }
  await connectDB();
  const {
    company,
    position,
    location,
    boardId,
    columnId,
    description,
    jobUrl,
    notes,
    salary,
    tags,
  } = data;

  if (!company || !position || !boardId || !columnId) {
    return { error: "Missing required fields" };
  }
  // Verify that user logged in has access to the board ownership before creating job application
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });
  if (!board) {
    return { error: "Board not found or access denied" };
  }
  // Verify that column exists in the board
  const column = await Column.findOne({ _id: columnId, boardId: boardId });
  if (!column) {
    return { error: "Column not found in the specified board" };
  }
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;
  const newJobApp = await JobApplication.create({
    company,
    position,
    location,
    boardId,
    columnId,
    description,
    jobUrl,
    notes,
    salary,
    tags,
    userId: session.user.id, // ✅ FIX
    order: maxOrder ? maxOrder.order + 1 : 0, // ✅ also fix this
  });
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: newJobApp._id },
  });
  return { success: true };
}
