import { useWallCsv } from '../../hooks/useWallCsv';
import { WallGrid } from './WallGrid';
import {useWallGame} from '../../hooks/useWallGame'

export function TheWall() {
  const { data, loading, error } = useWallCsv();

  // Always call the game hook, even if data is missing yet:
  const groups = data?.[0]?.groups ?? [];
  const { cells, selected, matchedCount, handleClick } = useWallGame(groups);

  if (loading)            return <p>Loading…</p>;
  if (error)              return <p>Error: {error}</p>;
  if (!data || !data[0])  return <p>No data</p>;

  return (
    <div>
      <h1>The Wall</h1>
      <WallGrid
        cells={cells}
        selectedIndices={selected}
        matchedIndices={Array.from({ length: matchedCount }, (_, i) => i)}
        onTileClick={handleClick}
      />
    </div>
  );
}