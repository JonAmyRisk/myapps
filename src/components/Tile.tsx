import Button from '@mui/material/Button';

interface TileProps {
  label: string;
  selected: boolean;
  matched: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function Tile({
  label,
  selected,
  matched,
  disabled,
  onClick,
}: TileProps) {
  // decide styles based on state
  const variant = matched || selected ? 'contained' : 'outlined';
  const bg =
    matched
      ? 'rgba(47, 138, 50, 1)'   // greenish
      : selected
      ? 'rgba(25, 118, 210, 0.6)'  // bluish
      : undefined;

  const hoverBg =
    matched
      ? 'rgba(47, 138, 50, 1)'
      : selected
      ? 'rgba(25,118,210,0.6)'
      : undefined;

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: '100%',
        height: '100%',
        textTransform: 'none',
        ...(bg && {
          backgroundColor: bg,
          '&:hover': { backgroundColor: hoverBg },
        }),
      }}
    >
      {label}
    </Button>
  );
}