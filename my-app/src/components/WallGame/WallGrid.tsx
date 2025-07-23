import type { ClueCell } from '../../hooks/useShuffledClues';
import { Tile } from '../Tile';

interface WallGridProps {
  cells: ClueCell[];
  selectedIndices: number[];
  matchedIndices: number[];
  expired: boolean;
  onTileClick: (idx: number) => void;
}

export function WallGrid({
  cells,
  selectedIndices,
  matchedIndices,
  expired,
  onTileClick,
}: WallGridProps) {
  return (
    <div className="wall-grid">
      {cells.map((cell, idx) => (
        <Tile
          key={idx}
          label={cell.clue}
          selected={selectedIndices.includes(idx)}
          matched={matchedIndices.includes(idx)}
          disabled={expired}
          onClick={() => onTileClick(idx)}
        />
      ))}
    </div>
  );
}