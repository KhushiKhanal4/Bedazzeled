import { useCallback, useRef, useState } from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * Generic undo/redo history hook.
 *
 * Each call to `set` pushes the current state onto the past stack and
 * replaces the present. `undo` pops from past into future; `redo` does the
 * reverse. The implementation is intentionally simple — no batching or
 * debounce — because the workspace state changes are discrete user actions.
 */
export function useHistory<T>(initial: T) {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initial,
    future: [],
  });

  const presentRef = useRef(history.present);
  presentRef.current = history.present;

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setHistory((current) => {
      const newValue =
        typeof next === "function" ? (next as (prev: T) => T)(current.present) : next;
      if (newValue === current.present) return current;
      return {
        past: [...current.past, current.present],
        present: newValue,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((current) => {
      if (current.past.length === 0) return current;
      const previous = current.past[current.past.length - 1];
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((current) => {
      if (current.future.length === 0) return current;
      const next = current.future[0];
      return {
        past: [...current.past, current.present],
        present: next,
        future: current.future.slice(1),
      };
    });
  }, []);

  const reset = useCallback((value: T) => {
    setHistory({ past: [], present: value, future: [] });
  }, []);

  return {
    state: history.present,
    set,
    undo,
    redo,
    reset,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}
