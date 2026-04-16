"use client";
import { Board } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreHorizontal,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
interface KanbanBoardProps {
  board: Board;
  userId: string;
}
interface ColConfig {
  color: string;
  icon: React.ReactNode;
}
const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DropableColumn({}) {}
const KabanBoard = ({ board, userId }: KanbanBoardProps) => {
  const cols = board.columns;
  return (
    <>
      <div>
        <div>
          {cols.map((col, key) => {
            const config = COLUMN_CONFIG[key % COLUMN_CONFIG.length] || {
              color: "bg-gray-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return <DropableColumn key={key} column={col} />;
          })}
        </div>
      </div>
    </>
  );
};

export default KabanBoard;
