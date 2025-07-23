import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useWallCsv } from '../../hooks/useWallCsv';
import { WallGrid } from './WallGrid';
import {useWallGame} from '../../hooks/useWallGame';
import { GroupsReview } from './GroupsReview';

export function TheWall() {
  const { data, loading, error } = useWallCsv();
  const groups = data?.[0]?.groups ?? [];
  const { cells, selected, matchedCount, handleClick } = useWallGame(groups);

  // Timer: start 3:30 (210s)
  const [timeLeft, setTimeLeft] = useState(210);
  useEffect(() => {
    if (timeLeft <= 0 || matchedCount == 16) return;
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const expired = timeLeft <= 0;
  const showReview = expired || matchedCount == 16;
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  if (loading)            return <p>Loading…</p>;
  if (error)              return <p>Error: {error}</p>;
  if (!data || !data[0])  return <p>No data</p>;

  return (
      <Box>
      <Typography
        variant="h6"
        sx={{ color: 'white', textAlign: 'center', mb: 2 }}
      >
        {minutes}:{seconds}
      </Typography>
      <WallGrid
        cells={cells}
        selectedIndices={selected}
        matchedIndices={Array.from({ length: matchedCount }, (_, i) => i)}
        onTileClick={handleClick}
        expired={expired}
      />
      {showReview && <GroupsReview groups={groups}/>}
      </Box>
  );
}