import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTestResultsStore = create(
  persist(
    (set) => ({
      results: {}, // { [testId]: { categoryScores, answers, completedAt } }

      saveResults: (testId, payload) =>
        set((state) => ({
          results: {
            ...state.results,
            [testId]: {
              ...payload,
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
    }),
    {
      name: "test-results-storage",
    },
  ),
);
