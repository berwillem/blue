// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTestResultsStore = create(
  persist(
    (set) => ({
      results: {},
      /*
        results structure:
        {
          [testId]: {
            answers: { [questionId]: number | null },
            meta: {
              skippedCount: number,
              answeredCount: number,
              totalQuestions: number,
            },
            completedAt: number
          }
        }
      */

      saveResults: (testId, { answers, meta }) =>
        set((state) => ({
          results: {
            ...state.results,
            [testId]: {
              answers,
              meta,
              completedAt: Date.now(),
            },
          },
        })),

      clearResults: (testId) =>
        set((state) => {
          const next = { ...state.results };
          delete next[testId];
          return { results: next };
        }),

      clearAllResults: () => ({
        results: {},
      }),
    }),
    {
      name: "test-results-storage",
    },
  ),
);
