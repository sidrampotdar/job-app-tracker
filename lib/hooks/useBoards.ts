"use client";

import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";
import { useEffect, useState } from "react";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  // ✅ FIX 1: Prevent infinite re-render loop
  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {
    // ✅ Optimistic UI update
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;

      // ✅ Find & remove from old column
      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId,
        );

        if (jobIndex !== -1) {
          jobToMove = col.jobApplications[jobIndex];

          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobApplicationId,
          );
          break;
        }
      }

      if (!jobToMove) return prev;

      // ✅ Insert into new column
      const targetColumnIndex = newColumns.findIndex(
        (col) => col._id === newColumnId,
      );

      if (targetColumnIndex === -1) return prev;

      const targetColumn = newColumns[targetColumnIndex];
      const updatedJobs = [...targetColumn.jobApplications];

      updatedJobs.splice(newOrder, 0, {
        ...jobToMove,
        columnId: newColumnId,
      });

      // ✅ Normalize order (important for drag-drop stability)
      const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
        ...job,
        order: idx * 100,
      }));

      newColumns[targetColumnIndex] = {
        ...targetColumn,
        jobApplications: jobsWithUpdatedOrders,
      };

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Update failed:", err);

      // ❗ Optional: rollback logic (advanced)
      // You can refetch board here if needed
      setError("Failed to update job application");
    }
  }

  return {
    board,
    columns,
    error,
    moveJob,
  };
}
