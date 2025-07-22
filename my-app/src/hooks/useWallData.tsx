import { useState, useEffect } from 'react';

export interface WallGroup {
  clues: string[];
  connection: string;
}

export interface Wall {
  groups: WallGroup[];
}

export function useWallData() {
  const [data, setData] = useState<Wall[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/wall/fetch')
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json() as Promise<Wall[]>;
      })
      .then((walls) => {
        setData(walls);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}