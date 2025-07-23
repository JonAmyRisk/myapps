import { useEffect, useState } from 'react';
import type { WallGroup } from '../../hooks/useWallCsv';
import { Box, Typography, TextField } from '@mui/material';

interface GroupsReviewProps {
  groups: WallGroup[];
}

export function GroupsReview({ groups }: GroupsReviewProps) {
  // one input per group
  const [guesses, setGuesses] = useState<string[]>(
    () => groups.map(() => '')
  );
  const [revealed, setRevealed] = useState<boolean[]>(() => groups.map(() => false));

  // if groups change, reset state
  useEffect(() => {
    setGuesses(groups.map(() => ''));
    setRevealed(groups.map(() => false));
  }, [groups]);


  const handleChange = (idx: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const next = [...guesses];
    next[idx] = e.target.value;
    setGuesses(next);
  };


  const handleReveal = (idx: number) => () => {
    setRevealed(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: 'white', fontSize: '1.25rem', mb: 2, textAlign: 'center' }}
      >
        Guess the connections
      </Typography>

      {groups.map((grp, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 2,
          }}
        >
          {/* Clue string */}
          <Typography
            variant="body1"
            sx={{ color: 'white', fontSize: '1rem', flex: 1 }}
          >
            {grp.clues.join(', ')}
          </Typography>

          {/* User input textbox */}
          <TextField
            label="Your connection"
            variant="outlined"
            size="small"
            value={guesses[i]}
            onChange={handleChange(i)}
            sx={{
              backgroundColor: '#e0e0e0', // light grey
              input: { color: 'black', fontSize: '1rem' },
              label: { color: 'black', fontSize: '0.875rem' },
            }}
          />

          {/* Answer textbox */}
          <TextField
            label="Answer"
            variant="filled"
            size="small"
            value={revealed[i] ? grp.connection : 'Reveal'}
            InputProps={{ readOnly: true }}
            onClick={handleReveal(i)}
            sx={{
              cursor: 'pointer',
              flex: '0 0 200px',
              backgroundColor: revealed[i] ? '#d0f0c0' : '#c0c0c0',
              input: { color: 'black', fontSize: '1rem' },
              label: { color: 'black', fontSize: '0.875rem' },
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

