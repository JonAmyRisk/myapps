export type Tool = 'landing' | 'apcalc' | 'thewall';

export interface SidemenuProps {
  activeTool: Tool;
  setActiveTool: React.Dispatch<React.SetStateAction<Tool>>;
}

export function Sidemenu({ activeTool, setActiveTool }: SidemenuProps) {
  return (
    <aside className="sidebar">
      <button
        className={activeTool === 'landing' ? 'active' : ''}
        onClick={() => setActiveTool('landing')}
      >
        Landing
      </button>
      <button
        className={activeTool === 'apcalc' ? 'active' : ''}
        onClick={() => setActiveTool('apcalc')}
      >
        AP Calculator
      </button>
      <button
        className={activeTool === 'thewall' ? 'active' : ''}
        onClick={() => setActiveTool('thewall')}
      >
        Connect Wall
      </button>
      <button>Button 4</button>
      <button>Button 5</button>
    </aside>
  );
}