import { useMemo } from 'react';
import type { WallGroup } from './useWallData';

export interface ClueCell {
  clue: string;
  connection: string;
}

export function useShuffledClues(groups: WallGroup[]): ClueCell[] {
  return useMemo(() => {
    // 1) Flatten groups → cells
    const cells: ClueCell[] = groups.flatMap(group =>
      group.clues.map(clue => ({
        clue,
        connection: group.connection,
      }))
    );

    // 2) Fisher–Yates shuffle in place
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    return cells;
  }, [groups]);
}