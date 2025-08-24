import { useState, useEffect, useMemo, useCallback } from 'react';
import {useShuffledClues} from './useShuffledClues';
import type { WallGroup } from './useWallData';
import type { ClueCell } from './useShuffledClues';

interface WallGame {
  cells: ClueCell[];
  selected: number[];
  matchedCount: number;
  handleClick: (idx: number) => void;
}
export function useWallGame(groups: WallGroup[]) : WallGame {
  const initial = useShuffledClues(groups);

  const [matched, setMatched]     = useState<ClueCell[]>([]);
  const [unmatched, setUnmatched] = useState<ClueCell[]>(initial);
  const [selected, setSelected]   = useState<number[]>([]);

  // reset when new data arrives
  useEffect(() => {
    setMatched([]);
    setUnmatched(initial);
    setSelected([]);
  }, [initial]);

  const cells = useMemo(() => [...matched, ...unmatched], [matched, unmatched]);

  const handleClick = useCallback((idx: number) => {
    const matchedCount = matched.length;
    if (idx < matchedCount) return;

    let next = selected.includes(idx)
      ? selected.filter(i => i !== idx)
      : selected.length < 4
        ? [...selected, idx]
        : selected;

    if (next.length === 4) {
      const rel  = next.map(i => i - matchedCount);
      const conns = rel.map(i => unmatched[i].connection);
      if (conns.every(c => c === conns[0])) {
        const won = rel.map(i => unmatched[i]);
        setMatched(m => [...m, ...won]);
        setUnmatched(u => u.filter((_, i) => !rel.includes(i)));
      }
      next = [];
    }

    setSelected(next);
  }, [matched, unmatched, selected]);

  return { cells, selected, matchedCount: matched.length, handleClick };
}
