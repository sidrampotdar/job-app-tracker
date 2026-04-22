"use client";
import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CreateJobApplicationDialog from "@/components/create-job-app-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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

function DropableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || []; // Sort job applications by order

  return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent
        className={`space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg $
        }`}
      >
        {sortedJobs.map((job, key) => (
          <SortableJobCard
            key={key}
            job={{ ...job, columnId: job.columnId || column._id }}
            columns={sortedColumns}
          />
        ))}
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}
const KabanBoard = ({ board, userId }: KanbanBoardProps) => {
  const cols = board.columns; // now full objects
  // console.log(cols); // Log columns to verify data

  const sortedColumns = cols?.sort((a, b) => a.order - b.order) || [];
  return (
    <>
      <div>
        <div>
          {cols.map((col, key) => {
            const config = COLUMN_CONFIG[key % COLUMN_CONFIG.length] || {
              color: "bg-gray-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DropableColumn
                key={key}
                column={col}
                config={config}
                boardId={String(board._id)}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return <div></div>;
}

export default KabanBoard;
