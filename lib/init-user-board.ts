import connectDB from "./db"; // DB connection
import { Board, Column } from "./models"; // Models

const DEFAULT_COLUMNS = [
  // Default columns
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export default async function initUserBoard(userId: string) {
  // Init board function
  try {
    await connectDB(); // Connect DB

    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" }); // Check existing
    if (existingBoard) return existingBoard; // Return if exists

    const board = await Board.create({
      // Create board
      userId,
      name: "Job Hunt",
      columns: [],
    });

    const columns = await Promise.all(
      // Create columns
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id, // ✅ FIXED
          jobApplications: [],
        }),
      ),
    );

    board.columns = columns.map((col) => col._id); // Set columns
    await board.save(); // Save board

    return board; // Return board
  } catch (error) {
    // Catch error
    throw new Error( // Throw error
      `Failed to initialize user board for user ${userId}: ${error}`,
    );
  }
}
