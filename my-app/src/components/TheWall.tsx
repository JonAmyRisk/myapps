export function TheWall() {
  // generate numbers 1–16
  const buttons = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div>
      <h1>The Wall</h1>
      <div className="wall-grid">
        {buttons.map((n) => (
          <button key={n}>{n}</button>
        ))}
      </div>
    </div>
  );
}