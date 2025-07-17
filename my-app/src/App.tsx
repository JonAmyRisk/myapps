import { useState } from 'react';
import './App.css';
import { Sidemenu, type Tool } from './components/Sidemenu';
import { LandingPage } from './components/LandingPage';
import { APCalculator } from './components/APCalculator';
import { TheWall } from './components/TheWall';


function App() {
  // Use the same Tool type
  const [activeTool, setActiveTool] = useState<Tool>('landing');

  return (
    <div className="app-container">
      <Sidemenu
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />

      <main className="main-content">
        <div className="tool-wrapper">
          
          {activeTool === 'apcalc' ? (
            <APCalculator />
          ) : activeTool === 'thewall' ? (
            <TheWall />
          ) : (
            <LandingPage />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
