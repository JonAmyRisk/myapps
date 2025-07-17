import { useState } from 'react';

export function APCalculator() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>AP Calculator</h1>
      <div className="card">
        <button onClick={() => setCount(c => c + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/components/APCalculator.tsx</code> and save.</p>
      </div>
    </div>
  );
}