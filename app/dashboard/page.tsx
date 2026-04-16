import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import KanbanBoard from "@/components/kanban-board";

const Dashboard = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  await connectDB();

  const boardDoc = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  }).lean();

  if (!boardDoc) {
    redirect("/sign-in");
  }

  const board = JSON.parse(JSON.stringify(boardDoc));

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
