import { getSession } from "@/lib/auth/auth"; // Get user session
import connectDB from "@/lib/db"; // Connect to DB
import { Board } from "@/lib/models"; // Board model
import { redirect } from "next/navigation"; // Redirect function
import KanbanBoard from "@/components/kanban-board"; // Kanban component

const Dashboard = async () => {
  // Dashboard page component
  const session = await getSession(); // Get current session

  if (!session?.user) {
    // If no user, redirect to sign in
    redirect("/sign-in");
  }

  await connectDB(); // Connect to DB

  const boardDoc = await Board.findOne({
    // Find user's board
    userId: session.user.id,
    name: "Job Hunt",
  })
    .populate("columns") // Populate columns
    .lean(); // Lean query

  if (!boardDoc) {
    // If no board, redirect
    redirect("/sign-in");
  }
  const board = JSON.parse(JSON.stringify(boardDoc)); // Serialize to plain object

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>

          <p className="text-gray-600">Track your job applications</p>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
};
export default Dashboard;
