import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface CsvRow {
  wallId: string;
  groupIndex: string;
  connection: string;
  clue1: string;
  clue2: string;
  clue3: string;
  clue4: string;
}

export interface WallGroup {
  clues: string[];
  connection: string;
}

export interface Wall {
  groups: WallGroup[];
}

export function useWallCsv() {
  const [data, setData] = useState<Wall[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('./data/quizwalls.csv')
      .then(res => res.text())
      .then(text => {
        const { data: rows } = Papa.parse<CsvRow>(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.replace(/^\uFEFF/, '').trim(),
        });

        const map = new Map<number, WallGroup[]>();
        rows.forEach(r => {
          // now r.wallId, r.connection, r.clue1, etc. exist
          const wid = parseInt(r.wallId, 10);
          const grp: WallGroup = {
            connection: r.connection,
            clues: [r.clue1, r.clue2, r.clue3, r.clue4],
          };
          if (!map.has(wid)) map.set(wid, []);
          map.get(wid)!.push(grp);
        });
          const allWallIds = Array.from(map.keys());
          const randomId = allWallIds[Math.floor(Math.random() * allWallIds.length)];
          const groups = map.get(randomId)!;
          setData([{ groups }]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  return { data, loading, error };
}